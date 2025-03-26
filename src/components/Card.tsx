import { useEffect, useRef, useState } from "react";
import "../style/Card.scss";

const Card: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const [isTextFixed, setIsTextFixed] = useState(false);
  const [textFinalTop, setTextFinalTop] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null); // 新增狀態追蹤滾動到哪張圖片
  const [backgroundColor, setBackgroundColor] = useState<string>("#8ac674"); // 設定預設背景顏色

  // 顏色對應陣列
  const colors = [
    "#8ac674", 
    "#f1f1f1",
    "#cc2637", 
    "#4fbfd1", 
    "#727373", 
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current || !imagesRef.current) return;

      const images = imagesRef.current.querySelectorAll(".image"); // 取得所有圖片區塊
      const windowHeight = window.innerHeight;
      let newActiveIndex: number | null = null;

      images.forEach((img, index) => {
        const imgRect = img.getBoundingClientRect();

        if (imgRect.top <= windowHeight / 2 && imgRect.bottom >= windowHeight / 2) {
          newActiveIndex = index;
        }
      });

      setActiveImageIndex(newActiveIndex);

      // 設定背景顏色根據 activeImageIndex 改變
      if (newActiveIndex !== null) {
        setBackgroundColor(colors[newActiveIndex]);
      }

      const imagesRect = imagesRef.current.getBoundingClientRect();
      if (imagesRect.top <= 0 && imagesRect.bottom > windowHeight) {
        setIsTextFixed(true);
        setTextFinalTop(null);
      } else if (window.scrollY >= 2600) {
        setIsTextFixed(false);
        setTextFinalTop(2600);
      } else {
        setIsTextFixed(false);
        setTextFinalTop(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeImageIndex]); // 每次 activeImageIndex 改變時都會執行一次副作用

  return (
    <div className="card-container" style={{ backgroundColor }}>
      <div
        ref={textRef}
        className="text-container"
        style={{
          position: isTextFixed ? "fixed" : "absolute",
          top: isTextFixed ? "15vh" : textFinalTop !== null ? `${textFinalTop}px` : "20vh",
        }}
      >
        <h1 className="center-text">正念型態IP</h1>
        <div className="column">
          <img
            src="/ZenMate/icon/1.svg"
            alt="覺悟開拓者"
            className={activeImageIndex === 0 ? "active" : ""}
          />
          <img
            src="/ZenMate/icon/2.svg"
            alt="明心者"
            className={activeImageIndex === 1 ? "active" : ""}
          />
          <img
            src="/ZenMate/icon/3.svg"
            alt="專注行者"
            className={activeImageIndex === 2 ? "active" : ""}
          />
          <img
            src="/ZenMate/icon/4.svg"
            alt="和諧守望"
            className={activeImageIndex === 3 ? "active" : ""}
          />
          <img
            src="/ZenMate/icon/5.svg"
            alt="迷霧旅人"
            className={activeImageIndex === 4 ? "active" : ""}
          />
        </div>
      </div>

      {/* 圖片區塊 */}
      <div ref={imagesRef} className="image-section">
        <div className="image left">
          <img src="/ZenMate/IP/覺悟開拓者_工作區域 1.png" alt="覺悟開拓者" />
          <h3 className="name">覺悟開拓者<br /><span>(Awakening Pioneer)</span></h3>
          <p className="desc">代表在不同正念人格之間穿梭、進階的過程，展現出正念提升的可能性。</p>
        </div>
        <div className="image right">
          <img src="/ZenMate/IP/明心者_工作區域 1.png" alt="明心者" />
          <h3 className="name">明心者<br /><span>(Mindful Sage)</span></h3>
          <p className="desc">象徵全然的覺察與平衡，像智者般擁有高度的正念能力，生活滿足且內心平靜。</p>
        </div>
        <div className="image left">
          <img src="/ZenMate/IP/專注行者_工作區域 1.png" alt="專注行者" />
          <h3 className="name">專注行者<br /><span>(Focused Wanderer)</span></h3>
          <p className="desc">擅長某些正念面向，例如行動專注，但在其他方面稍顯不足，仍不斷探索成長的道路。</p>
        </div>
        <div className="image right">
          <img src="/ZenMate/IP/和諧守望_工作區域 1.png" alt="和諧守望" />
          <h3 className="name">和諧守望者<br /><span>(Harmony Keeper)</span></h3>
          <p className="desc">擁有接納與非反應性的優勢，能在波動中保持平衡，但專注力稍有欠缺。</p>
        </div>
        <div className="image left">
          <img src="/ZenMate/IP/迷霧旅人_工作區域 1.png" alt="迷霧旅人" />
          <h3 className="name">迷霧旅人<br /><span>(Fogged Seeker)</span></h3>
          <p className="desc">缺乏全面的正念能力，情緒和專注力較為不穩，但內心渴望突破迷霧找到光明。</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
