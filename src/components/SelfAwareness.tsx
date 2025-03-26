import { useRef } from "react";
import { motion } from "framer-motion";
import "../style/SelfAwareness.scss";

const scrollItemVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: .8, ease: "easeOut" } }
};

const SelfAwareness: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="awareness-container">
      <div className="awareness-text">
        <h2>探索正念</h2>
        <p>
          正念型態是一種提升個人覺察力與內在平衡的方法，透過專注當下，
          幫助我們建立更深的自我理解。
        </p>
      </div>

      <div className="awareness-scroll" ref={scrollContainerRef}>
        <div className="scroll-content">
          {[
            { img: "/ZenMate/image/HA3.png", title: "正念型態分析", desc: ["結合止觀覺察注意量表（MAAS）", "五因素正念量表（FFMQ）", "進行正念型態分析"] },
            { img: "/ZenMate/image/HA1.png", title: "情緒數據分析", desc: ["擷取Chrome、Apple Music、Spotify之紀錄", "記錄行為與情緒傾向", "情緒與行為聯繫"] },
            { img: "/ZenMate/image/HA2.png", title: "反思日記工具", desc: ["可選擇問答或文字輸入的方式", "記錄情感、行為和思想", "分析情緒觸發點"] },
          ].map((item, index) => (
            <motion.div
              className="scroll-item"
              key={index}
              variants={scrollItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <img src={item.img} alt={item.title} />
              <p>{item.title}</p>
              <ul>
                {item.desc.map((text, idx) => (
                  <li key={idx}>{text}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelfAwareness;
