import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import haNoiPic from "../../assets/pictures/ha-noi.jpg";
import hoChiMinhPic from "../../assets/pictures/ho-chi-minh.jpg";
import daNangPic from "../../assets/pictures/da-nang.jpg";
import nhaTrangPic from "../../assets/pictures/nha-trang.jpg";
import haiPhongPic from "../../assets/pictures/hai-phong.jpg";
import phuQuocPic from "../../assets/pictures/phu-quoc.png";
import canThoPic from "../../assets/pictures/can-tho.jpg";
import huePic from "../../assets/pictures/hue.jpg";
import vinhPic from "../../assets/pictures/vinh.jpg";
import quyNhonPic from "../../assets/pictures/quy-nhon.jpg";
import "./SwiperSlider.css";

// Tạo component Popup
const Popup = ({ city, content, onClose }) => {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h2>{city.cityName}</h2>
                <img src={city.cityImage} alt={city.cityName} />
                <p>{content}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const SwiperSlider = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);

    const slides = [
        { id: 1, cityName: "Hà Nội", cityImage: haNoiPic },
        { id: 2, cityName: "Hồ Chí Minh", cityImage: hoChiMinhPic },
        { id: 3, cityName: "Đà Nẵng", cityImage: daNangPic },
        { id: 4, cityName: "Nha Trang", cityImage: nhaTrangPic },
        { id: 5, cityName: "Hải Phòng", cityImage: haiPhongPic },
        { id: 6, cityName: "Phú Quốc", cityImage: phuQuocPic },
        { id: 7, cityName: "Cần Thơ", cityImage: canThoPic },
        { id: 8, cityName: "Huế", cityImage: huePic },
        { id: 9, cityName: "Vinh", cityImage: vinhPic },
        { id: 10, cityName: "Quy Nhơn", cityImage: quyNhonPic },
    ];

    const openPopup = (city) => {
        setSelectedCity(city);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
        setSelectedCity(null);
    };

    return (
        <div className="trading">
            <div className="swiper-wrap">
                <Swiper
                    pagination={{ clickable: false }}
                    loop={true}
                    grabCursor={true}
                    effect={"coverflow"}
                    centeredSlides={true}
                    slidesPerView={3}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 3,
                    }}
                    modules={[Navigation, EffectCoverflow]}
                    className="trading-slider"
                >
                    {slides.map((slide) => (
                        <SwiperSlide
                            key={slide.id}
                            className="tranding-slide"
                            onClick={() => openPopup(slide)}
                        >
                            <div className="tranding-slide-img">
                                <img src={slide.cityImage} alt={slide.cityName} />
                            </div>
                            <div className="tranding-slide-content">
                                <div className="tranding-slide-content-bottom">
                                    <h2 className="food-name">{slide.cityName}</h2>
                                    <h3 className="food-rating">
                                        <span>Rating</span>
                                        <div className="rating">⭐⭐⭐⭐⭐</div>
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {popupOpen && selectedCity && (
                <Popup
                    city={selectedCity}
                    content={`Explore ${selectedCity.cityName}, A great destination for those who love traveling and experiencing unique culture. With beautiful natural scenery, rich cuisine and a long cultural history, ${selectedCity.cityName} promises to bring you unforgettable experiences. Come and explore outstanding landmarks, immerse yourself in the rhythm of life here and enjoy relaxing moments with family and friends!`}
                    onClose={closePopup}
                />
            )}
        </div>
    );
};

export default SwiperSlider;

