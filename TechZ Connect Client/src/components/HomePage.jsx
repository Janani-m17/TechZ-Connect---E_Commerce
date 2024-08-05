// src/HomePage.jsx
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../App.css';

// Example images for the Swiper
const images = [
  'https://cdn.gencraft.com/prod/user/6aff4a73-876d-4d19-a1b8-3aeefc7b7163/de07820b-64f0-4f23-b385-f6c30529e831/image/image1_0.jpg?Expires=1722914228&Signature=CwArV6kYYVJC4KSkXjV-s5UuY3THIHC2FtcFHddXXZqsRVEvn55xVY5mtCHutMsxS-a~eWfeHI67SnfALp2nOh-zIQj1kCU79GTRvfFx8Go5Y8gMB~R-ndHTS8u~m46Rg0hqi2DcP1M6pzn7guDQhfnQkaV0yoJJyqmZZKfICnzDXFCkTOjZETrIbjmbxi2XbtlWLtP4IsLZ~k751DhAy3n84jTxeBBjttLY9CnQwqE7QUv-Zu-lfs72k3idP-kn13AK1ZXEbh-dyQUeHOH~HEeIbq7jLg3N-Gm4D5BtbzFn7P4VLZPqEqVFzIXarVeDyqSmUwcHarzyhEXxGUWw-g__&Key-Pair-Id=K3RDDB1TZ8BHT8',
  'https://cdn.gencraft.com/prod/user/6aff4a73-876d-4d19-a1b8-3aeefc7b7163/88d5ea53-deff-4e3f-ae6a-001ff4b7a489/image/image1_0.jpg?Expires=1722914698&Signature=N1pR5qR-xBODk2rqKsxdcXROPol-u9E69oxm-fM-m6neLAwXogPYseI76UUr2AXKzp5-SgFET-81GFrcMxTYKCB~rBwhn7ZgAMbrg4rPbrdupPlfZumriH2Z85md73eZucNMtWD6axr9axei6gD6uUaMBU26lvRcsIOInSNseBVQnl7mKp7IoD3SdGuNycJuseiNZ74NEbfzYSlx-XpsXfJSMtSfDyK8KSyfHHpxSoaKOcsNkgPdfJQ3IKyID4j6qPzKfa92oOdyrW6jJhvKWbcRyYTEqPUM1MMdrlmFsedDwhO5PJubD4UD55SY9jydGn8YH42wqfcJqERVdAVV9g__&Key-Pair-Id=K3RDDB1TZ8BHT8',
  'https://cdn.gencraft.com/prod/user/6aff4a73-876d-4d19-a1b8-3aeefc7b7163/82fe741f-9c5a-4e17-8963-2ea03b5ee18f/image/image1_0.jpg?Expires=1722914736&Signature=VNvb0bt6zGOvra6lnzVHyxWQKh0rvCYCYpuh~t-fUF3GH1da83770r~EIivRc5sH7md-pJ0Fqey7K6Q42F1DDmW7s-X93NX6Ow1KiqyYqwdFBTaOsVawa7C5t-dyI2UYNJZVw51SjYlSkEMR3k0tziAYM62ot52U49vHVkHvpr-qJyFaxQjnz6IT1kWnNEGeOHedNkGLL3xViQPSaSP8dzb7~u14bO4wnkNQOZNVye~RM4CmjWA9i3j6zTcc2ExGoly3YkqMyNYRdF4iYSzygX9UoZ3N6P49SLNVWGUCCm4r3BoksOeNB7QZ7OyEukHbvl8A11RbHGMSLqCQxspXOQ__&Key-Pair-Id=K3RDDB1TZ8BHT8',
  'https://cdn.gencraft.com/prod/user/6aff4a73-876d-4d19-a1b8-3aeefc7b7163/82fe741f-9c5a-4e17-8963-2ea03b5ee18f/image/image0_0.jpg?Expires=1722914736&Signature=S58EljmubxEjQO7M9KW063i8wwNpzoxySd51UGHO9Z2w7dVnwaugJZimlAjTp487LVyzXgeSqSjFlqU4RgPCX9uIw8npfdK~1PH1jBgOT7noXauv6wln3uPdB4Ohl~BO18~SqzWPJ4hPHeEf1LFOlVhSGF1a2kk0Fn4HinBlJsKLxWuE7ywMF5XtlCj2OuUoZyYFu3LGDK0usfJO4gtIg~M2HFuDhq-iwFH8i9JQpZcH4QfO0ZSHGsQc4spTRtr9smtkIFkkr5EdwAf9UqgCUEkDBuyWEOd6piroNLue1oeF4ygTEGUu1DJcwBfIM2UI0d1bNCMLvh0a6k86jt6P2A__&Key-Pair-Id=K3RDDB1TZ8BHT8',
  'https://cdn.gencraft.com/prod/user/6aff4a73-876d-4d19-a1b8-3aeefc7b7163/88d5ea53-deff-4e3f-ae6a-001ff4b7a489/image/image0_0.jpg?Expires=1722914698&Signature=hzs9wrRdWY6T8F-wVdYI-48k7OQWNfz3NQ8eZSpQ1EC3F2kt0BX-VUPf-JXEVY9HXXQAUpWMPdTMVWjssDNKT75VGk-CzcwBHnShO2~WXpttOzLncsWgjbk9cB1Gl0pwZC97eKX5sKSrpyC8mfGc9IWRwjWauUtBU9fd7wAFTTZaChnAzSYkkns1Bgl9ZhmQn2zE3dpY7lMJxXnhbW1myK~QG0-YFcX4TMSnq7ShZLWH-yBpjmFHQ4OIzO4kNaNuM2RC5H9T7RCW3frCorMLs6hNuJY7cqr796ybLth7qhJtosi2xpuVT~20UU59wnyfoopNur~2MUqFzH-rWE7e4w__&Key-Pair-Id=K3RDDB1TZ8BHT8',
];

// Example featured products
const featuredProducts = [
  { id: 1, name: 'Apple 2023 MacBook Pro', price: '$99.99', image: 'https://m.media-amazon.com/images/I/618d5bS2lUL._SX679_.jpg' },
  { id: 2, name: 'OnePlus Nord Buds 2 TWS in Ear Earbuds', price: '$149.99', image: 'https://m.media-amazon.com/images/I/61-ZYvldY+L._SX522_.jpg' },
  { id: 3, name: 'Amazon Echo Dot (5th Gen)', price: '$199.99', image: 'https://m.media-amazon.com/images/I/81lGxS2ZisL._SY450_.jpg' },
  { id: 4, name: 'CULTSPORT Ranger XR 1.43 AMOLED Smartwatch', price: '$199.99', image: 'https://m.media-amazon.com/images/I/514GujqPP2L._SX679_.jpg' },
  { id: 5, name: 'Logitech MX Master 3S - Wireless Mouse', price: '$199.99', image: 'https://m.media-amazon.com/images/I/61ni3t1ryQL._SX679_.jpg' },
];

// FAQ data
const faqs = [
  { question: 'What is your return policy?', answer: 'We accept returns within 30 days of purchase.' },
  { question: 'Do you offer international shipping?', answer: 'Yes, we ship to most countries worldwide.' },
  { question: 'How can I contact customer support?', answer: 'You can reach us via email at techzconnect@techz.in.' },
];

const HomePage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="container bg-color my-5 px-5 py-3">
      <h1><center>Welcome to TechZ Connect</center></h1>
      {/* Swiper Section */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="swiper-container"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '500px' }} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>

      {/* Featured Products Section */}
      <div className="featured-products my-5">
        
        <h1 className='fphead'><b>Explore Cool Gadgets with great deals!</b></h1>
        <h2 className='fphead'>Here's the Top Products of the week</h2>
        <button onClick={() => window.location.href = '/products'}>Go to Products</button>
        <div className="product-cards">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="faqs my-5">
        <h2>FAQs</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <button>{openFAQ === index ? '-' : '+'}</button>
              </div>
              {openFAQ === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer mt-5">
        <p>&copy; 2024 TechZ Connect. All rights reserved.</p>
        <p>Contact us at <a href="mailto:support@example.com">techzconnect@techz.in</a></p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
