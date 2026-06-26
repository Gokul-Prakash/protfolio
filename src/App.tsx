import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Projects from './components/pages/Projects';
import Contact from './components/pages/Contact';
import Playground from './components/pages/Playground';
import NotFound from './components/pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import './styles/main.scss';

const App = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="playground" element={<Playground />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
