'use client';
import { useState, useEffect, TouchEvent } from 'react';
import Image from 'next/image';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const images = [
    '/image/1 (1).jpg',
    '/image/1 (2).jpg',
    '/image/1 (3).jpg',
    '/image/1 (4).jpg',
    '/image/1 (5).jpg',
    '/image/1 (6).jpg',
    '/image/1 (7).jpg',
    '/image/1 (8).jpg',
    '/image/1 (9).jpg',
    '/image/1 (10).jpg',
    '/image/1 (11).jpg',
    '/image/1 (12).jpg',
    '/image/1 (13).jpg'
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const preloadInitialImages = () => {
      const imagesToPreload = images.slice(0, 10);
      imagesToPreload.forEach((src: string) => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadInitialImages();
  }, [images]);

  const getPreloadIndexes = (currentIndex: number, totalImages: number) => {
    const indexes = [];
    for (let i = -5; i <= 5; i++) {
      if (i === 0) continue;
      const index = (currentIndex + i + totalImages) % totalImages;
      if (index >= 0 && index < totalImages) {
        indexes.push(index);
      }
    }
    return indexes;
  };

  const handleImageChange = (direction: 'left' | 'right') => {
    const totalImages = images.length;
    setCurrentImageIndex((prevIndex) => {
      const newIndex = direction === 'left'
        ? (prevIndex - 1 + totalImages) % totalImages
        : (prevIndex + 1) % totalImages;
      return newIndex;
    });
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStart) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleImageChange('right');
      } else {
        handleImageChange('left');
      }
      setTouchStart(0);
    }
  };

  return (
    <main 
      className="relative min-h-screen bg-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="relative w-full h-screen">
        <Image
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          fill
          priority
          className="object-contain"
        />
        {getPreloadIndexes(currentImageIndex, images.length).map((index) => (
          <link key={index} rel="preload" as="image" href={images[index]} />
        ))}
      </div>

      <button
        className={`absolute left-1/2 -translate-x-1/2 bottom-8 rounded-full 
          border border-black group transition-all duration-300 z-20
          ${isMobile ? 'w-4 h-4 shadow-sm' : 'w-2.5 h-2.5'}
          hover:scale-110 active:scale-95`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className={`absolute inset-0 rounded-full bg-black 
          transition-opacity duration-300
          ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
      </button>

      <div 
        className={`absolute inset-0 flex items-center justify-center bg-white/90
        transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsMenuOpen(false);
          }
        }}
      >
        <div className={`text-black text-center ${isMobile ? 'px-4' : ''} space-y-8`}>
          <div className="space-y-2">
            <p className="font-serif text-2xl tracking-wide">Photographer</p>
            <p className="font-serif text-xl font-light tracking-widest">Luozhou</p>
            <p className="text-sm tracking-wider uppercase">Based in Guangzhou</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm tracking-wider uppercase">say hello</p>
            <a 
              href="mailto:luozhou519@gmail.com"
              className="text-sm font-light tracking-wide hover:underline transition-all duration-300"
            >
              luozhou519@gmail.com
            </a>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm tracking-wider uppercase">Social media</p>
            <div className="flex justify-center items-center gap-8">
              <a 
                href="https://www.instagram.com/luozhou02" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-light tracking-wide text-[#0095f6] hover:underline transition-all duration-300"
              >
                Instagram
              </a>
              <a 
                href="https://www.xiaohongshu.com/user/profile/6218d7000000000010009443" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-light tracking-wide text-[#fe2c55] hover:underline transition-all duration-300"
              >
                Xiaohongshu
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}