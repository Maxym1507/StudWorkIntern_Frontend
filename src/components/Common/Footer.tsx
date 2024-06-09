import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© 2024 StudWorkIntern. Всі права захищені.</p>
                <div className="footer-links">
                    <a href="/contact">Контакти</a>
                    <a href="/privacy">Політика конфіденційності</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
