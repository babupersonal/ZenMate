import "../style/SensoryEnhancement.scss";
import FlowingMenu from './FlowingTitle'

const demoItems = [
    {
        text: "AI心靈導師LINE Bot",
        image: "/ZenMate/image/heart.png",
        images: '/ZenMate/image/LINE BOT聊天機器人.png',
        dropdownItems: [
          { text: "LINE BOT聊天機器人"},
          { text: "LLM大型語言模型"},
          { text: "以心靈導師角度開導、閒聊"}
        ]
    },
    
];
const demoItems2 = [
  {
      text: "冥想引導",
      image: "/ZenMate/image/chakras.png",
      images: '/ZenMate/image/冥想引導.png',
      dropdownItems: [
        { text: "串接LLM大型語言模型"},
        { text: "根據使用者數據客製化冥想引導內容" },
        { text: "提供早晨、上下班、睡前等模式"}
      ]
  },
  {
      text: "正念語錄推播",
      image: "/ZenMate/image/calm.png",
      images: '/ZenMate/image/正念語錄推播.png',
      dropdownItems: [
        { text: "LINE BOT聊天機器人推播" },
        { text: "推播正念相關語錄、方法"}
      ]
  },
  
];


const SensoryEnhancement: React.FC = () => {
  return (
    <div className="sensory">
        <h2>覺知強化</h2>
        <p>
            提升專注當下的能力，應對壓力與挑戰。
            建立內在韌性，提升冷靜與理性的決策能力。
        </p>
        <FlowingMenu items={demoItems} />
        <h2>正念引導</h2>
        <p>
            行動中的正念，轉化內外世界
        </p>
        <FlowingMenu items={demoItems2} />

    </div>
  );
};
export default SensoryEnhancement;
