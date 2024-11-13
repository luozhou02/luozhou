'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleImageChange = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left'
      ? (currentImageIndex - 1 + images.length) % images.length
      : (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-white">
      {/* 左右点击区域 */}
      {!isMenuOpen && (
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
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`relative w-[80vw] h-[80vh]
          ${isMenuOpen ? 'blur-md scale-105' : ''}`}
        >
          <Image
            src={images[currentImageIndex]}
            alt="Portfolio image"
            fill
            sizes="80vw"
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* 预加载下一张图片 */}
        <div className="hidden">
          <Image
            src={images[(currentImageIndex + 1) % images.length]}
            alt="Next image"
            width={1}
            height={1}
            priority
          />
          <Image
            src={images[(currentImageIndex - 1 + images.length) % images.length]}
            alt="Previous image"
            width={1}
            height={1}
            priority
          />
        </div>
      </div>

      {/* 菜单按钮 */}
      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full 
          border border-black group transition-all duration-300 z-20"
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
            <p className="text-sm">Photographer</p>
            <p className="text-sm font-light">Luozhou</p>
            <p className="text-sm">Based in Guangzhou</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm">say hello</p>
            <a 
              href="mailto:luozhou519@gmail.com"
              className="text-sm inline-block hover:underline"
            >
              luozhou519@gmail.com
            </a>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm">Social media</p>
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