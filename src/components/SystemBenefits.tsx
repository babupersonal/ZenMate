import React from 'react';
import "../style/SystemBenefits.scss";

const SystemBenefits: React.FC = () => {
    const benefits = [
        {
            title: '個人層面效益',
            items: [
                '降低焦慮與壓力',
                '提升專注與穩定性',
                '增強心理韌性',
                '促進情緒健康'
            ]
        },
        {
            title: '企業與教育應用層面效益',
            items: [
                '提升員工生產力',
                '降低健康成本',
                '促進教育輔導'
            ]
        },
        {
            title: '社會層面效益',
            items: [
                '推動正念風氣',
                '降低心理疾病率',
                '提升幸福感'
            ]
        }
    ];

    return (
        <div className="system-benefits-container">
            <h2>系統效益</h2>
            <div className="benefits-grid">
                {benefits.map((benefit, index) => (
                    <div key={index} className="benefit-card">
                        <h3>{benefit.title}</h3>
                        <ul>
                            {benefit.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SystemBenefits;
