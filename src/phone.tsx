import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { TextureLoader } from "three";
import { motion } from "framer-motion-3d";

interface PhoneProps {
  image: string;
  position: [number, number, number];
  rotation: [number, number, number];
}

function Phone({ image, position, rotation }: PhoneProps) {
  const phoneRef = useRef<any>(null);
  const texture = useLoader(TextureLoader, image);

  useFrame(() => {
    if (phoneRef.current) {
      const scrollY = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      phoneRef.current.rotation.y = scrollY * Math.PI * 12; // ✅ 滾動時旋轉手機
    }
  });

  return (
    <motion.group
      ref={phoneRef}
      position={[position[0], position[1], position[2]]}
      rotation={rotation}
      animate={{ y: position[1] }} // ✅ 讓手機隨滾動變化
      transition={{ type: "spring", stiffness: 50, damping: 15 }} // ✅ 讓動畫更順暢
    >
      {/* ✅ 手機外殼 */}
      <RoundedBox args={[2.5, 5, 0.2]} radius={0.25}>
        <meshStandardMaterial color="black" />
      </RoundedBox>

      {/* ✅ 手機螢幕 */}
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[2.3, 4.7]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </motion.group>
  );
}

export default Phone;
