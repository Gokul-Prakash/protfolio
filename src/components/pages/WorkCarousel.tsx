import { motion } from "framer-motion";
import { images } from "@assets/assets";

const ITEMS = [
  { img: images.workCarousel.zentra, label: "Zentra" },
  { img: images.workCarousel.magicClub, label: "Magic Club" },
  { img: images.workCarousel.octech, label: "Octech" },
  { img: images.workCarousel.analyticsGenie, label: "Analytics Genie" },
  { img: images.workCarousel.coreArea, label: "Core Area" },
  { img: images.workCarousel.deMuis, label: "De Muis" },
];

// Duplicate so the scroll loop is seamless
const TRACK_ITEMS = [...ITEMS, ...ITEMS];

const WorkCarousel = () => {
  return (
    <section className="work-carousel">
      <motion.div
        className="work-carousel__header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      ></motion.div>

      <div className="work-carousel__viewport" aria-label="Work carousel">
        <div className="work-carousel__track">
          {TRACK_ITEMS.map((item, i) => (
            <div className="work-carousel__card" key={i}>
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkCarousel;
