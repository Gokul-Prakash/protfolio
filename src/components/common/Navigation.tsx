import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { containerSlideVariants, itemVariants } from '../../utils/animations';
import { NAV_ITEMS } from '../../utils/constants';

const Navigation = () => {
  return (
    <nav>
      <motion.ul
        className="nav__list"
        variants={containerSlideVariants}
        initial="hidden"
        animate="visible"
      >
        {NAV_ITEMS.map(item => (
          <motion.li key={item.path} variants={itemVariants}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav__link${isActive ? ' active' : ''}`}
              end={item.path === '/'}
            >
              {item.label}
            </NavLink>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  );
};

export default Navigation;
