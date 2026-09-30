import HeroSection from './HeroSection';
import WorkCarousel from './WorkCarousel';
import MyWork from './MyWork';
import ThingsIBuild from './ThingsIBuild';
import Toolbox from './Toolbox';
import WhoAmISection from './WhoAmISection';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <WorkCarousel />
      <MyWork />
      <ThingsIBuild />
      <Toolbox />
      <WhoAmISection />
    </main>
  );
};

export default Home;
