import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import SectionHeading from '../ui/SectionHeading';
import { TOOLS } from '../../content/tools';

const { Engine, Bodies, Body, Composite, Constraint } = Matter;

const STEP = 1000 / 60;        // fixed physics timestep (ms)
const HOVER_SCALE = 1.14;
const PAD = 2;                 // physics radius padding so the visual bob never overlaps
const WALL = 400;              // wall thickness — thick enough that a hard throw can't tunnel through
const MAX_SPEED = 32;
// Drop order across the stage — mixes big and small bubbles instead of left-to-right by size
const SLOTS = [5, 0, 9, 3, 11, 7, 1, 10, 4, 8, 2, 6];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const baseRadius = (width: number) => clamp(width * 0.056, 34, 76);

type Bubble = {
  body: Matter.Body;
  el: HTMLButtonElement;
  face: HTMLElement;
  radius: number;      // visual radius at rest
  scale: number;       // current hover scale (physics body is scaled to match)
  hover: boolean;
  focus: boolean;
  phase: number;
  speed: number;
};

const Toolbox = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const engine = Engine.create();
    const world = engine.world;

    let W = stage.clientWidth;
    let H = stage.clientHeight;
    let base = baseRadius(W);

    // ── Walls: floor, sides and a ceiling well above the stage (bubbles spawn up there)
    let walls: Matter.Body[] = [];
    const buildWalls = () => {
      Composite.remove(world, walls);
      const opts = { isStatic: true, restitution: 0.4, friction: 0.1 };
      walls = [
        Bodies.rectangle(W / 2, H + WALL / 2, W + WALL * 2, WALL, opts),
        Bodies.rectangle(-WALL / 2, -H, WALL, H * 4 + WALL * 2, opts),
        Bodies.rectangle(W + WALL / 2, -H, WALL, H * 4 + WALL * 2, opts),
        Bodies.rectangle(W / 2, -H * 3 - WALL / 2, W + WALL * 2, WALL, opts),
      ];
      Composite.add(world, walls);
    };
    buildWalls();

    // ── Bubbles
    const bubbles: Bubble[] = TOOLS.map((tool, i) => {
      const el = bubbleRefs.current[i]!;
      const r = base * tool.size;
      const x = clamp(((SLOTS[i] + 0.5) / TOOLS.length) * W + (Math.random() - 0.5) * r, r, W - r);
      // Reduced motion: start inside the stage and pre-settle, so nothing falls
      const y = reduced ? H * 0.3 + Math.random() * H * 0.5 : -r - 40 - Math.random() * H * 1.6;
      const body = Bodies.circle(x, y, r + PAD, {
        restitution: 0.55,
        friction: 0.05,
        frictionAir: 0.012,
        density: 0.0016,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
      el.style.width = el.style.height = `${r * 2}px`;
      return {
        body,
        el,
        face: el.querySelector<HTMLElement>('.toolbox__face')!,
        radius: r,
        scale: 1,
        hover: false,
        focus: false,
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 0.5,
      };
    });

    let dropped = false;
    let dropAt = 0;
    const drop = () => {
      dropped = true;
      dropAt = performance.now();
      Composite.add(world, bubbles.map((b) => b.body));
    };

    if (reduced) {
      drop();
      for (let i = 0; i < 300; i++) Engine.update(engine, STEP);
    }

    // ── Drag state (one pointer at a time)
    let drag: {
      b: Bubble;
      id: number;
      constraint: Matter.Constraint;
      startX: number;
      startY: number;
      startT: number;
      moved: boolean;
    } | null = null;

    const isActive = (b: Bubble) => b.hover || b.focus || drag?.b === b;

    const refresh = (b: Bubble) => {
      const active = isActive(b);
      b.el.classList.toggle('is-active', active);
      b.el.classList.toggle('is-dragging', drag?.b === b);
    };

    // Nudge neighbours away when a bubble grows under the cursor
    const nudgeNeighbours = (b: Bubble) => {
      const { x, y } = b.body.position;
      bubbles.forEach((o) => {
        if (o === b) return;
        const dx = o.body.position.x - x;
        const dy = o.body.position.y - y;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = (b.radius + o.radius) * 1.3;
        if (dist > reach) return;
        const push = (1 - dist / reach) * 2.2;
        Body.setVelocity(o.body, {
          x: o.body.velocity.x + (dx / dist) * push,
          y: o.body.velocity.y + (dy / dist) * push - 0.4,
        });
      });
    };

    // Click — a small hop and a ring pulse
    const pop = (b: Bubble) => {
      const lift = 7 + b.radius * 0.04;
      Body.setVelocity(b.body, { x: b.body.velocity.x + (Math.random() - 0.5) * 3, y: -lift });
      Body.setAngularVelocity(b.body, (Math.random() - 0.5) * 0.25);
      b.el.classList.remove('is-popped');
      void b.el.offsetWidth; // restart the CSS animation
      b.el.classList.add('is-popped');
    };

    const toLocal = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      return {
        x: clamp(e.clientX - rect.left, 0, W),
        y: clamp(e.clientY - rect.top, -H, H),
      };
    };

    const cleanups: (() => void)[] = [];
    const listen = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement,
      type: K,
      fn: (e: HTMLElementEventMap[K]) => void,
    ) => {
      el.addEventListener(type, fn);
      cleanups.push(() => el.removeEventListener(type, fn));
    };

    bubbles.forEach((b) => {
      listen(b.el, 'pointerenter', (e) => {
        if (e.pointerType !== 'mouse') return;
        b.hover = true;
        refresh(b);
        nudgeNeighbours(b);
      });
      listen(b.el, 'pointerleave', (e) => {
        if (e.pointerType !== 'mouse') return;
        b.hover = false;
        refresh(b);
      });
      listen(b.el, 'focus', () => { b.focus = true; refresh(b); });
      listen(b.el, 'blur', () => { b.focus = false; refresh(b); });

      listen(b.el, 'pointerdown', (e) => {
        if (drag || e.button !== 0 || !dropped) return;
        e.preventDefault();
        b.el.setPointerCapture(e.pointerId);
        const p = toLocal(e);
        const constraint = Constraint.create({
          pointA: { x: p.x, y: p.y },
          bodyB: b.body,
          pointB: { x: p.x - b.body.position.x, y: p.y - b.body.position.y },
          stiffness: 0.2,
          damping: 0.1,
          length: 0,
        });
        Composite.add(world, constraint);
        drag = { b, id: e.pointerId, constraint, startX: p.x, startY: p.y, startT: performance.now(), moved: false };
        refresh(b);
      });
      listen(b.el, 'pointermove', (e) => {
        if (!drag || drag.id !== e.pointerId) return;
        const p = toLocal(e);
        drag.constraint.pointA.x = p.x;
        drag.constraint.pointA.y = p.y;
        if (Math.hypot(p.x - drag.startX, p.y - drag.startY) > 6) drag.moved = true;
      });
      const release = (e: PointerEvent) => {
        if (!drag || drag.id !== e.pointerId) return;
        const { moved, startT } = drag;
        Composite.remove(world, drag.constraint);
        drag = null;
        refresh(b);
        if (e.type === 'pointerup' && !moved && performance.now() - startT < 350) pop(b);
      };
      listen(b.el, 'pointerup', release);
      listen(b.el, 'pointercancel', release);
      // Keyboard activation (Enter / Space) — pointer clicks are handled on pointerup
      listen(b.el, 'click', (e) => {
        if (e.detail === 0 && dropped) pop(b);
      });
    });

    // ── Simulation
    const step = () => {
      bubbles.forEach((b) => {
        // Ease hover scale and resize the physics body with it, so neighbours get pushed
        const target = isActive(b) ? HOVER_SCALE : 1;
        if (Math.abs(target - b.scale) > 0.001) {
          const next = b.scale + (target - b.scale) * 0.2;
          Body.scale(b.body, next / b.scale, next / b.scale);
          b.scale = next;
        }
        // Weighted like a roly-poly — bubbles rock back upright so logos stay readable
        if (drag?.b !== b) {
          const a = Math.atan2(Math.sin(b.body.angle), Math.cos(b.body.angle));
          Body.setAngularVelocity(b.body, b.body.angularVelocity - a * 0.0012);
        }
        const { x: vx, y: vy } = b.body.velocity;
        const speed = Math.hypot(vx, vy);
        if (speed > MAX_SPEED) Body.setVelocity(b.body, { x: (vx / speed) * MAX_SPEED, y: (vy / speed) * MAX_SPEED });
      });

      Engine.update(engine, STEP);

      // Safety net — anything that escapes the stage drops back in from the top
      bubbles.forEach((b) => {
        const { x, y } = b.body.position;
        if (x < -b.radius || x > W + b.radius || y > H + b.radius || y < -H * 3) {
          Body.setPosition(b.body, { x: W / 2, y: -b.radius * 2 });
          Body.setVelocity(b.body, { x: 0, y: 0 });
        }
      });
    };

    const render = (now: number) => {
      // Once settled, fade in a gentle float so the pile never looks frozen
      const float = reduced || !dropped ? 0 : clamp((now - dropAt - 1800) / 1600, 0, 1);
      bubbles.forEach((b) => {
        const { x, y } = b.body.position;
        const t = now * 0.001 * b.speed + b.phase;
        const bob = Math.sin(t * 1.3) * 2 * float;
        const sway = Math.sin(t * 0.9) * 3 * float;
        b.el.style.transform = `translate3d(${x - b.radius}px, ${y - b.radius + bob}px, 0) scale(${b.scale})`;
        b.face.style.transform = `rotate(${(b.body.angle * 180) / Math.PI + sway}deg)`;
        // Flip the label below when the bubble is pressed against the top edge
        if (isActive(b)) b.el.classList.toggle('label-below', y - b.radius < 44);
      });
    };

    let raf = 0;
    let last = 0;
    let acc = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      acc += Math.min(now - last, 100);
      last = now;
      let steps = 0;
      while (acc >= STEP && steps < 4) {
        step();
        acc -= STEP;
        steps++;
      }
      if (steps === 4) acc = 0;
      render(now);
    };
    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    render(performance.now());

    // Run only while on screen; drop once a good part of the stage is visible
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
        if (!dropped && entry.intersectionRatio >= 0.35) drop();
      },
      { threshold: [0, 0.35] },
    );
    io.observe(stage);

    // Rescale bubbles and move walls when the stage resizes
    const ro = new ResizeObserver(() => {
      const nextW = stage.clientWidth;
      const nextH = stage.clientHeight;
      if (nextW === W && nextH === H) return;
      const nextBase = baseRadius(nextW);
      const k = nextBase / base;
      bubbles.forEach((b) => {
        Body.scale(b.body, k, k);
        b.radius *= k;
        b.el.style.width = b.el.style.height = `${b.radius * 2}px`;
        const { x, y } = b.body.position;
        Body.setPosition(b.body, {
          x: clamp((x / W) * nextW, b.radius, nextW - b.radius),
          y: Math.min(y, nextH - b.radius),
        });
      });
      W = nextW;
      H = nextH;
      base = nextBase;
      buildWalls();
      render(performance.now());
    });
    ro.observe(stage);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      cleanups.forEach((fn) => fn());
      Composite.clear(world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <section className="toolbox">
      <SectionHeading
        label="Toolbox"
        title="The tools behind the work."
        description="Design, motion, 3D, web and AI — the tools I use to turn ideas into experiences."
      />

      <div className="toolbox__stage" ref={stageRef} role="group" aria-label="Tools I use">
        <span className="toolbox__stage-fig" aria-hidden="true">Drag · Toss · Play</span>
        {TOOLS.map((tool, i) => (
          <button
            key={tool.name}
            type="button"
            className="toolbox__bubble"
            aria-label={tool.name}
            ref={(el) => { bubbleRefs.current[i] = el; }}
          >
            <span className="toolbox__face">
              <img
                src={tool.logo}
                alt=""
                draggable={false}
                className={tool.themed ? 'is-themed' : undefined}
              />
            </span>
            <span className="toolbox__label" aria-hidden="true">{tool.name}</span>
          </button>
        ))}
      </div>

      <footer className="toolbox__rail">
        <p className="toolbox__rail-quote">
          These aren't just tools I know — they're the tools I use to make things.
        </p>
        <span className="toolbox__rail-label">{TOOLS.length} tools in rotation</span>
      </footer>
    </section>
  );
};

export default Toolbox;
