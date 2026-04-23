/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Heart, Calendar, MapPin, Camera, Menu } from 'lucide-react';

// Gallery images - initial set
const INITIAL_IMAGES = [
   { id: 1, url: '/wedding1.jpg',  },
  { id: 2, url: '/wedding2 (2).jpg',  },
  { id: 3, url: '/wedding3.jpg',  },
  { id: 4, url: '/wedding4.jpg',  },
  { id: 5, url: '/wedding5.jpg', },
  { id: 6, url: '/wedding6.jpg',  },
  { id: 7, url: '/wedding7.jpg', },
  { id: 8, url: '/wedding8.jpg',  },
  { id: 9, url: '/wedding9.jpg',  },
  { id: 10, url: '/wedding10.jpg',  },
   { id: 11, url: '/wedding11.jpg',  },
    { id: 12, url: '/wedding12.jpg',  },
     { id: 13, url: '/wedding13.jpg',  },
      { id: 14, url: '/wedding14.jpg',  },
       { id: 15, url: '/wedding15.jpg',  },
    
];

export default function App() {
  const [images, setImages] = useState(INITIAL_IMAGES);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    
    // Simulate a small delay for aesthetic feel
    setTimeout(() => {
      const newImages = Array.from(files).map((file, index) => {
        const f = file as File;
        return {
          id: Date.now() + index,
          url: URL.createObjectURL(f),
          alt: f.name.split('.')[0].replace(/-/g, ' ')
        };
      });

      setImages(prev => [...newImages, ...prev]);
      setIsUploading(false);
    }, 800);
  };

  const openLightbox = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (selectedImage === null) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (nextIndex >= images.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = images.length - 1;
    
    setSelectedImage(images[nextIndex].id);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, images]);

  const currentImage = images.find(img => img.id === selectedImage);

  return (
    <div className="min-h-screen selection:bg-sage/20 bg-cream selection:text-sage">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-cream/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-serif tracking-widest uppercase text-stone-800">
            T <span className="text-gold mx-1">&</span> Y
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">
            <a href="#gallery" className="hover:text-sage transition-colors">Gallery</a>
            <a href="#story" className="hover:text-sage transition-colors">Our Story</a>
            <label className="cursor-pointer hover:text-sage transition-colors">
              
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload}
              />
            </label>
          </div>

          <div className="flex items-center space-x-4">
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-sage transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cream border-b border-stone-200 overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-6 text-[11px] font-medium uppercase tracking-[0.3em] text-stone-500">
                <a 
                  href="#gallery" 
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-sage transition-colors"
                >
                  Gallery
                </a>
                <a 
                  href="#story" 
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-sage transition-colors"
                >
                  Our Story
                </a>
                <label className="cursor-pointer hover:text-sage transition-colors">
                
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      handleFileUpload(e);
                      setIsMenuOpen(false);
                    }}
                  />
                </label>
               
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/hero.jpg" 
            alt="Teddy and Yadani" 
            className="w-full h-full object-cover brightness-90"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/teddyyadani/1920/1080';
            }}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="block text-[10px] uppercase tracking-[0.5em] mb-6 font-medium opacity-80">The Wedding of</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif mb-8 italic font-light">
              Teddy <span className="text-gold font-sans not-italic">&</span> Yadi
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 text-[11px] tracking-[0.3em] font-light opacity-90">
              <div className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-3 text-gold" />
                <span>MAY 2, 2026</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-3 text-gold" />
                <span>Addis Ababa.Ethiopia</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-20 bg-white/30 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 80] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section id="story" className="py-24 md:py-40 px-6 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <Heart className="w-6 h-6 text-gold mx-auto mb-10 opacity-60" />
             <h2 className="text-3xl md:text-5xl font-serif italic mb-12 text-stone-800 leading-tight">
              "Because he hath set his love upon me, therefore will I deliver him: I will set him on high because he hath known my name.
   Psalms 91:14"
            </h2>
            <h2 className="text-3xl md:text-5xl font-serif italic mb-12 text-stone-800 leading-tight">
              "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
            </h2>
            <div className="w-12 h-[1px] bg-gold/40 mx-auto mb-12"></div>
            <p className="text-stone-500 leading-relaxed font-light tracking-wide max-w-2xl mx-auto text-sm md:text-base">
              Welcome to our digital gallery. This space is a collection of moments from our special day, 
              captured through the lens of fine art film. We are so grateful to have shared these 
              memories with our closest family and friends.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="pb-32 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-20">
            <div className="h-[1px] flex-1 bg-stone-200/60"></div>
            <div className="flex flex-col items-center mx-10 text-center">
              <Camera className="w-5 h-5 text-gold/40 mb-4" />
              <h3 className="text-[10px] uppercase tracking-[0.6em] text-stone-400 font-medium">The Gallery</h3>
              <label className="mt-4 cursor-pointer group">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            <div className="h-[1px] flex-1 bg-stone-200/60"></div>
          </div>

          {isUploading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-12"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-sage animate-pulse">Developing film...</p>
            </motion.div>
          )}

          <div className="masonry-grid">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index % 3 * 0.1, duration: 0.8 }}
                layout
                className="masonry-item group cursor-pointer relative overflow-hidden bg-stone-100"
                onClick={() => openLightbox(image.id)}
              >
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-auto transition-transform duration-1000 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback for missing local files
                    if (!image.url.startsWith('blob:')) {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${image.id}/800/1200`;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="px-6 py-3 border border-white/40 backdrop-blur-sm">
                    <span className="text-white text-[10px] uppercase tracking-[0.3em] font-light">View Details</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 bg-stone-950 text-white px-6 text-center border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-2xl font-serif italic mb-8 tracking-wide">Teddy & Yadi</div>
          <p className="text-stone-500 text-[10px] uppercase tracking-[0.4em] mb-16 font-light">Thank you for being part of our journey 
            2026 Tewudros Bulo & Yadeni Abebe Wedding. Addis Ababa.Ethiopia
          </p>
          
          <div className="flex justify-center space-x-8 mb-20">
            <div className="group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/50 transition-all duration-500">
                <Heart className="w-4 h-4 text-stone-500 group-hover:text-gold transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="h-[1px] w-20 bg-white/10 mx-auto mb-12"></div>
          <p className="text-stone-600 text-[9px] uppercase tracking-[0.3em] font-light">All rights reserved.Copy Right© 2026 Kena Abebe</p>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/98 flex items-center justify-center p-6 md:p-12"
          >
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={closeLightbox}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-50 p-2"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <button 
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors z-50 p-4"
            >
              <ChevronLeft className="w-8 h-8 font-light" />
            </button>

            <button 
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors z-50 p-4"
            >
              <ChevronRight className="w-8 h-8 font-light" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative max-w-full max-h-full flex flex-col items-center"
            >
              <div className="relative group">
                <img 
                  src={currentImage.url} 
                  alt={currentImage.alt} 
                  className="max-w-full max-h-[75vh] object-contain shadow-2xl border border-white/5"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-10 text-center">
                <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-light mb-3">
                  {currentImage.alt}
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="h-[1px] w-8 bg-white/10"></div>
                  <p className="text-gold/60 text-[9px] tracking-[0.3em]">
                    {images.findIndex(img => img.id === selectedImage) + 1} OF {images.length}
                  </p>
                  <div className="h-[1px] w-8 bg-white/10"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
