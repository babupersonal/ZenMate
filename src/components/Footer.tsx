import React from 'react';
import '../style/Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>聯絡我們</h3>
                    <p>Email: C111118207@nkust.edu.tw</p>
                </div>
                <div className="footer-section">
                    <h3>關於我們</h3>
                    <p>我們是一個專注於創新的團隊，致力於開發人工智慧與心理健康的最佳解決方案。</p>
                </div>
                {/* <div className="footer-section">
                    <h3>社交媒體</h3>
                    <p>Facebook | Twitter | LinkedIn</p>
                </div> */}
                <div className="footer-section">
                    <h3>技術亮點</h3>
                    <ul>
                        <li>大型語言模型 (LLM)</li>
                        <li>自然語言處理 (NLP)</li>
                        <li>情緒數據整合</li>
                        <li>知識圖譜 (Neo4j)</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 ZenMate. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;