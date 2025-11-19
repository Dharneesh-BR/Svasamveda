import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Yoga Enthusiast',
    content: 'The Mind programs have transformed my daily routine. The guided meditations help me stay focused and calm throughout the day.',
    image: 'https://randomuser.me/api/portraits/women/32.jpg'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Fitness Coach',
    content: 'The Body programs are exceptional! The combination of yoga and nutrition guidance has significantly improved my clients\' results.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg'
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Meditation Teacher',
    content: 'The Soul programs have added depth to my spiritual practice. The sound therapy sessions are particularly transformative.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    role: 'Corporate Professional',
    content: 'The stress management techniques from the Mind category have been a game-changer for my work-life balance.',
    image: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  {
    id: 5,
    name: 'Meera Kapoor',
    role: 'Wellness Coach',
    content: 'The holistic approach of combining mind, body, and soul has been revolutionary for my personal growth and my coaching practice.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section className="py-4 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-main sm:text-4xl">
            What Our Community Says
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 sm:mt-4">
            Hear from people who have transformed their lives with our programs
          </p>
        </div>
        
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.testimonial-pagination',
              bulletClass: 'w-2 h-2 bg-gray-300 rounded-full inline-block mx-1 cursor-pointer',
              bulletActiveClass: 'bg-main w-6',
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white/90 p-6 rounded-lg shadow-md h-full mx-2 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <img 
                      className="h-14 w-14 rounded-full object-cover" 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  <div className="mt-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Pagination */}
          <div className="flex justify-center mt-8">
            <div className="testimonial-pagination flex space-x-2">
              {testimonials.map((_, index) => (
                <span 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === activeIndex ? 'bg-main w-6' : 'bg-gray-300'
                  }`}
                  onClick={() => swiperRef.current?.swiper.slideTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
