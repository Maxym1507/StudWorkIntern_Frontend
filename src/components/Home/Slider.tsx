import React, { useEffect, useState } from 'react';
import './Slider.css';

const slides = [
    {
        image: 'image1.jpg',
        title: 'Ласкаво просимо до StudWorkIntern',
        text: 'Місце, де ви знайдете свою ідеальну роботу.'
    },
    {
        image: 'image2.jpg',
        title: 'Найкращі стажування',
        text: 'Отримайте досвід у провідних компаніях.'
    },
    {
        image: 'image3.jpg',
        title: 'Для роботодавців',
        text: 'Знайдіть талановитих працівників.'
    }
];

const Slider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Змінюється кожні 5 секунд

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`slider-item ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="slider-text">
                        <h2>{slide.title}</h2>
                        <p>{slide.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Slider;
