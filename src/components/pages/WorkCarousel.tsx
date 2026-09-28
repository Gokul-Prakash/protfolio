import { CAROUSEL_WORK } from '../../utils/content';

// Duplicate so the scroll loop is seamless
const TRACK_ITEMS = [...CAROUSEL_WORK, ...CAROUSEL_WORK];

const WorkCarousel = () => {
  return (
    <section className="work-carousel" aria-label="Recent work">
      <div className="work-carousel__viewport">
        <div className="work-carousel__track">
          {TRACK_ITEMS.map((item, i) => (
            <figure
              className="work-carousel__card"
              key={i}
              aria-hidden={i >= CAROUSEL_WORK.length || undefined}
            >
              <div className="work-carousel__media">
                <img src={item.img} alt={item.label} loading="lazy" draggable={false} />
              </div>
              <figcaption className="work-carousel__caption">
                <span className="work-carousel__caret">›</span>
                <span className="work-carousel__label">{item.label}</span>
                <span className="work-carousel__index">
                  {String((i % CAROUSEL_WORK.length) + 1).padStart(2, '0')}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkCarousel;
