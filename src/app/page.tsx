'use client';
import { useState, useEffect, TouchEvent } from 'react';
import Image from 'next/image';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 检测是否为移动设备
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // 预加载所有图片
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = images.map((src: string) => {
          return new Promise<void>((resolve, reject) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = reject;
          });
        });

        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();
  }, [images]);

  const handleImageChange = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left'
      ? (currentImageIndex - 1 + images.length) % images.length
      : (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  // 处理触摸事件
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      handleImageChange(diff > 0 ? 'right' : 'left');
    }
  };

  // 预加载相邻图片
  const preloadAdjacentImages = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    const nextIndex = (currentImageIndex + 1) % images.length;
    const imagesToPreload = [
      images[prevIndex],
      images[currentImageIndex],
      images[nextIndex],
    ];

    return imagesToPreload.map((src, index) => (
      <Image
        key={src}
        src={src}
        alt={`Preload image ${index}`}
        width={1}
        height={1}
        priority={index === 1}
        className="hidden"
      />
    ));
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-white">
      {/* 左右点击区域 */}
      {!isMenuOpen && (
        <div 
          className="fixed inset-0 flex z-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={`w-1/2 h-full ${!isMobile ? 'hover:cursor-left-arrow cursor-none' : ''}`}
            onClick={() => !isMobile && handleImageChange('left')}
          />
          <div 
            className={`w-1/2 h-full ${!isMobile ? 'hover:cursor-right-arrow cursor-none' : ''}`}
            onClick={() => !isMobile && handleImageChange('right')}
          />
        </div>
      )}

      {/* 主图片区域 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`relative w-[80vw] h-[80vh] md:w-[80vw] md:h-[80vh]
          ${isMenuOpen ? 'blur-md scale-105' : ''}`}
        >
          <Image
            src={images[currentImageIndex]}
            alt="Portfolio image"
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
            quality={90}
            style={{ objectFit: 'contain' }}
            loading="eager"
          />
        </div>

        {/* 预加载图片 */}
        <div className="hidden">
          {preloadAdjacentImages()}
        </div>
      </div>

      {/* 加载指示器 */}
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="w-3 h-3 bg-black rounded-full animate-ping" />
        </div>
      )}

      {/* 菜单按钮 */}
      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          md:w-2.5 md:h-2.5 w-4 h-4 rounded-full 
          border border-black group transition-all duration-300
          menu-button-mobile"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
        <div className="text-black text-center space-y-6">
          <div className="space-y-1">
            <p className="text-sm">Visual Artist</p>
            <p className="text-sm font-light">Luozhou</p>
            <p className="text-sm">Based in Guangzhou, China</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm">Contact</p>
            <a 
              href="mailto:luozhou519@gmail.com"
              className="text-sm inline-block hover:underline"
            >
              luozhou519@gmail.com
            </a>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm">Social Media</p>
            <div className="flex justify-center items-center gap-6">
              <a 
                href="https://www.instagram.com/luozhou02" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-[#0095f6] hover:underline cursor-pointer"
              >
                Instagram
              </a>
              <a 
                href="https://www.xiaohongshu.com/user/profile/6218d7000000000010009443" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-[#fe2c55] hover:underline cursor-pointer"
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