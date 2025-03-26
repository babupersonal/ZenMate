import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import Phone from '../phone';
import '../style/First.scss';

const itemLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const itemRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const itemBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

const First: React.FC = () => {
  return (
    <section className="main">
      <motion.div
        className="title"
        variants={itemLeft}
        initial="hidden"
        animate="visible"
        transition={{ type: 'spring', stiffness: 50, duration: 0.5 }}
      >
        <h1>智慧心靈導師</h1>
        <h2>Intelligent Mindfulness Mentor</h2>
      </motion.div>

      <motion.div
        className="introduce"
        variants={itemRight}
        initial="hidden"
        animate="visible"
        transition={{ type: 'spring', stiffness: 50, delay: 0.4, duration: 0.5 }}
      >
        <h2>心理健康：<br />二十一世紀的公共衛生挑戰</h2>
        <ul>
          <li>壓力與焦慮<br />約25% 的人一生中會面臨心理健康問題。</li>
          <li>經濟影響<br />焦慮與抑鬱每年使全球損失1萬億美元生產力。</li>
          <li>數位化時代的挑戰<br />25%年輕人因資訊過載專注力下降，影響工作效率。</li>
        </ul>
      </motion.div>

      <motion.div
        className="phone-section"
        variants={itemBottom}
        initial="hidden"
        animate="visible"
        transition={{ type: 'spring', stiffness: 60, delay: 0.8, duration: 0.5 }}
      >
        <Canvas className="canvas">
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />

          <Phone image="/ZenMate//image/phone2.png" position={[-2, 0, 0]} rotation={[0, -0.3, 0.2]} />
          <Phone image="/ZenMate//image/phone1.png" position={[2, 0, 0]} rotation={[0, 0.3, -0.2]} />
        </Canvas>
      </motion.div>
    </section>
  );
};

export default First;
