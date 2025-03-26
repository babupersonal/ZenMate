import React, { useRef } from 'react';
import { motion } from 'framer-motion';

import { useInView } from 'react-intersection-observer'; 
import "../style/TeamMate.scss";

const TeamMate = () => {
    const sectionRef = useRef(null);
    const { inView } = useInView({
        threshold: 0,
    });

    console.log(inView);

    const teamData = [
        {
            title: 'CEO\n（Chief Executive Officer）\n執行長 廖翊翔',
            roles: [
                '全端開發',
                '生成式人工智慧',
                '專案構想',
                '正念科技'
            ],
            color: '/Zenmate/image/hito1.jpg'
        },
        {
            title: 'CAO\n（Chief Art Officer）\n藝術總監 陳品宇',
            roles: [
                '人格化角色設計',
                'UI/UX 設計',
                '品牌美術設計',
                '品牌形象識別系統'
            ],
            color:'/Zenmate/image/hito2.jpg'
        },
        {
            title: 'CDO\n（Chief Digital Officer）\n數位總監 黃楷烜',
            roles: [
                '前端開發',
                '數位產品體驗優化',
                '數位轉型策略'
            ],
            color: '/image/hito3.jpg' 
        },
        {
            title: 'CBO\n（Chief Business Officer）\n商務總監 黃威揚',
            roles: [
                '商業可行性評估',
                '商業模式開發',
                '財務管理'
            ],
            color:'/image/hito4.jpg'
        }
    ];

    return (
        <div className="teammate-container" ref={sectionRef}>
            <h1 className="title">團隊介紹</h1>
            <div className="teammate-grid">
                {teamData.map((member, index) => (
                    <motion.div
                        key={index}
                        className="teammate-card"
                        initial={{ opacity: 1, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}  // 滾動觸發後保證動畫
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <div 
                            className="teammate-image"
                            style={{ backgroundImage: `url(${member.color})` }} // 動態設置背景圖片
                        ></div>
                        <div className="teammate-content">
                            <h2>
                                {member.title.split('\n').map((line, idx) => (
                                    <React.Fragment key={idx}>
                                        {line.includes("Chief") ? (
                                            <span className="small-text">{line}</span>
                                        ) : (
                                            line
                                        )}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </h2>
                            <ul>
                                {member.roles.map((role, idx) => (
                                    <li key={idx}>{role}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TeamMate;
