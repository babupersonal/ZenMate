import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import GradientText from '../components/GradientText';
import '../style/BackgroundIntroduce.scss';

interface NumberBlockProps {
  label: string;
  number: number;
  suffix?: string;
  duration?: number;
  className?: string; // className 是可選的，並傳遞給 NumberBlock 組件
}

function NumberBlock({ label, number, suffix, duration = 4, className }: NumberBlockProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div className={`number-block ${className ? className : ''}`} ref={ref}>
      <h3 className="number">
        {inView ? (
          <GradientText
            colors={["#455A64", "#6A5ACD", "#FF6B81", "#1B2A41", "#2E3B4E"]}
            animationSpeed={3}
            showBorder={false}
            className="gradient-number"
          >
            <CountUp end={number} duration={duration} suffix={suffix} />
          </GradientText>
        ) : (
          "0"
        )}
      </h3>
      <p>{label}</p>
    </div>
  );
}

function BackgroundIntroduce() {
  return (
    <div className="backrground-introdece">
      <h2>背景問題</h2>
      <div className="one">
        <h3>全球心理健康負擔</h3>
        <section className="intro-section">
          <NumberBlock label="全球疾病負擔中與心理健康問題相關的比例" number={13} suffix="%" />
          <NumberBlock label="全球職場員工因資訊過載感到焦慮或壓力的比例" number={40} suffix="%" />
          <NumberBlock label="美國受訪者經常受到電子郵件、社交媒體和通知干擾" number={86} suffix="%" />
          <NumberBlock label="受訪者認為過多的通知是壓力的重要來源" number={42} suffix="%" />
        </section>
      </div>

      <div className="two">
        <div className="half">
          <h3>焦慮與抑鬱</h3>
          <section className="intro-section">
            <NumberBlock label="焦慮與抑鬱每年導致全球的經濟損失" number={1000} suffix="億美元" />
            <NumberBlock 
              label="亞洲心理健康指數（50-79為緊張狀態）" number={62.4} suffix="分" className="mr"/>
          </section>
        </div>

        <div className="half">
          <h3>數位壓力與資訊過載</h3>
          <section className="intro-section">
            <NumberBlock label="職場員工因資訊過載而感到焦慮" number={40} suffix="%" className="ml"/>
            <NumberBlock label="資訊過載和數位壓力導致的全球疾病負擔比例" number={13} suffix="%" />
          </section>
        </div>
      </div>

      <div className="two">
        <div className="half">
          <h3>心理健康與科技使用</h3>
          <section className="intro-section">
            <NumberBlock label="心理健康專家認為正念訓練能有效降低焦慮與壓力" number={75} suffix="%" />
            <NumberBlock label="長期正念練習者表示生活滿意度明顯提升" number={90} suffix="%" className="mr"/>
          </section>
        </div>

        <div className="half">
          <h3>企業心理健康投資</h3>
          <section className="intro-section">
            <NumberBlock label="全球企業心理健康計畫投資額 (2030年)" number={1000} suffix="億美元" className="ml"/>
            <NumberBlock label="企業推動心理健康計畫後員工生產力提升比例" number={200} suffix="%" />
          </section>
        </div>
      </div>
    </div>
  );
}

export default BackgroundIntroduce;
