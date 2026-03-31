import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

export default function HeroSlider() {
  return (
    <div className="hero">
      <div className="container">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper"
          spaceBetween={24}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          loop={true}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="content">
              <h4>Introducing the new</h4>
              <h3>
                Microsoft Xbox <br /> 360 controller
              </h3>
              <p>Windows xp / windows 10 / windows 11</p>
              <li className="btn">
                <Link to="/">Shop Now</Link>
              </li>
            </div>
            <img src="https://cdn.discordapp.com/attachments/1450605485957976167/1488297901859016734/image.png?ex=69cc44ef&is=69caf36f&hm=3ca79469f977fa6d48f4c502f1b826e88d2f06c03a71417ce3405760f0f36376&" alt="banner1" />
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="content">
              <h4>Introducing the new</h4>
              <h3>
                Microsoft Xbox <br /> 360 controller
              </h3>
              <p>Windows xp / windows 10 / windows 11</p>
              <li className="btn">
                <Link to="/">Shop Now</Link>
              </li>
            </div>
            <img src="https://cdn.discordapp.com/attachments/1450605485957976167/1488298138912686090/image.png?ex=69cc4527&is=69caf3a7&hm=62c42b386083223b76af0cb31480db620c33310ffc2222da9e856978c8d69bd7&" alt="banner2" />
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="content">
              <h4>Introducing the new</h4>
              <h3>
                Microsoft Xbox <br /> 360 controller
              </h3>
              <p>Windows xp / windows 10 / windows 11</p>
              <li className="btn">
                <Link to="/">Shop Now</Link>
              </li>
            </div>
            <img src="https://media.discordapp.net/attachments/1450605485957976167/1488298283242623036/image.png?ex=69cc4549&is=69caf3c9&hm=6b385c9cfd7650c51ccdc4d9c6bbbd7885196d973df59c438ecb743b0fe6a17e&=&format=webp&quality=lossless&width=1430&height=550" alt="banner3" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
