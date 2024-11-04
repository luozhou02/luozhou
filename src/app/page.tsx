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

  // 初始预加载
  useEffect(() => {
    const preloadInitialImages = async () => {
      const imagesToPreload = images.slice(0, 10);
      await Promise.all(
        imagesToPreload.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );
    };

    preloadInitialImages();
  }, []);

  const getPreloadIndexes = (currentIndex: number, totalImages: number) => {
    const indexes = [];
    for (let i = -5; i <= 5; i++) {
      if (i === 0) continue;
      const index = (currentIndex + i + totalImages) % totalImages;
      indexes.push(index);
    }
    return indexes;
  };

  const handleImageChange = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left'
      ? (currentImageIndex - 1 + images.length) % images.length
      : (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleImageChange('right');
      } else {
        handleImageChange('left');
      }
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-white">
      {/* 左右点击区域 - 仅在桌面端显示 */}
      {!isMenuOpen && !isMobile && (
        <div className="fixed inset-0 flex z-10">
          <div 
            className="w-1/2 h-full hover:cursor-left-arrow cursor-none"
            onClick={() => handleImageChange('left')}
          />
          <div 
            className="w-1/2 h-full hover:cursor-right-arrow cursor-none"
            onClick={() => handleImageChange('right')}
          />
        </div>
      )}

      {/* 主图片区域 */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className={`relative ${isMobile ? 'w-screen h-screen p-4' : 'w-[80vw] h-[80vh]'}
          ${isMenuOpen ? 'blur-md scale-105' : ''}`}
        >
          <Image
            src={images[currentImageIndex]}
            alt="Portfolio image"
            fill
            sizes={isMobile ? "100vw" : "80vw"}
            priority
            style={{ 
              objectFit: 'contain',
              padding: isMobile ? '1rem' : '0'
            }}
          />
        </div>

        {/* 预加载图片 */}
        <div className="hidden">
          {getPreloadIndexes(currentImageIndex, images.length).map((index) => (
            <Image
              key={index}
              src={images[index]}
              alt={`Preload image ${index}`}
              width={1}
              height={1}
              priority
            />
          ))}
        </div>
      </div>

      {/* 菜单按钮 */}
      <button
        className={`absolute left-1/2 -translate-x-1/2 rounded-full 
          border border-black group transition-all duration-300 z-20
          ${isMobile ? 'bottom-8 w-3 h-3 menu-button-mobile' : 'bottom-8 w-2.5 h-2.5'}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="absolute inset-0 rounded-full bg-black opacity-100 transition-opacity duration-300" />
      </button>

      {/* 菜单内容 */}
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