import { useState, useEffect } from "react";
import "./index.scss";
import First from "./components/First";
import BackgroundIntroduce from "./components/BackgroundIntroduce";
import ScrollVelocity from './components/ScrollVelocity';
import Card from "./components/Card";
import SelfAwareness from "./components/SelfAwareness";
import SensoryEnhancement from "./components/SensoryEnhancement";
import TeamMate from "./components/Teammate";
import Footer from "./components/Footer";
import SystemBenefits from "./components/SystemBenefits";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 滾動到指定區域
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="page">
      {isLoading && (
        <div className={`loading-overlay ${!isLoading ? 'hidden' : ''}`}>
          <img
            src="/ZenMate/image/loading.png" 
            className={`loading-image ${!isLoading ? 'hidden' : ''}`}
          />
        </div>
      )}

    
      <nav className="navbar">
        <img className="menu-icon" src="/ZenMate/logo/logo-03.png" alt="Menu" onClick={() => scrollToSection("first") } />
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className={`menus ${menuOpen ? 'open' : ''}` } >
          <p className="item" onClick={() => scrollToSection("background-introduce")}>背景問題</p>
          <p className="item" onClick={() => scrollToSection("scroll-velocity")}>正念型態</p>
          <p className="item" onClick={() => scrollToSection("self-awareness")}>自我覺察</p>
          <p className="item" onClick={() => scrollToSection("sensory-enhancement")}>覺知強化</p>
          <p className="item" onClick={() => scrollToSection("sensory")}>正念引導</p>
          <p className="item" onClick={() => scrollToSection("system-benefits")}>系統效益</p>
          <p className="item" onClick={() => scrollToSection("team-mate")}>團隊介紹</p>
        </div>
      </nav>

      <div id="first"></div>
      <First />
      
      <div id="background-introduce">
        <BackgroundIntroduce />
      </div>
      <div id="scroll-velocity">
        <Card />
      </div>
      <div id="self-awareness"></div>
        <ScrollVelocity
          texts={['自我覺察', '探索內心，理解自我']} 
          className="custom-scroll-text"
        />
      
      <SelfAwareness />
      <div id="sensory-enhancement"></div>
    
      
      <div id="sensory">
      <SensoryEnhancement />
      </div>

      <div id="system-benefits">
        <SystemBenefits />
      </div>
      <div id="team-mate">
        <TeamMate />
      </div>
      <Footer />
    </div>
  );
}

export default App;
