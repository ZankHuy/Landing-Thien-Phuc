import { useState, useEffect, useRef } from "react";

interface OptimizedImageProps {
  src: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
  thumbnail?: string;
}

/**
 * Hình ảnh tối ưu với:
 * - Ảnh thu nhỏ (kích thước nhỏ) để hiển thị
 * - Ảnh kích thước đầy đủ cho lightbox
 * - Lazy loading bản địa
 * - Click để xem kích thước đầy đủ trong lightbox
 */
export function OptimizedImage({
  src,
  alt = "",
  className = "",
  aspectRatio = "4/3",
  thumbnail
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Sử dụng ảnh thu nhỏ để hiển thị, ảnh đầy đủ cho lightbox
  const displaySrc = thumbnail || src;

  // Intersection Observer để lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Tải trước ảnh độ phân giải cao khi cuộn tới
  useEffect(() => {
    if (isInView && thumbnail && src !== thumbnail) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsHighResLoaded(true);
    }
  }, [isInView, thumbnail, src]);

  return (
    <>
      <div
        ref={imgRef}
        className={`relative overflow-hidden bg-stone-200 cursor-zoom-in ${className}`}
        style={{ aspectRatio }}
        onClick={() => setShowLightbox(true)}
      >
        {/* Placeholder khi đang tải */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-200">
            <div className="w-8 h-8 border-2 border-stone-300 border-t-[#b89b72] rounded-full animate-spin" />
          </div>
        )}

        {/* Hình ảnh thật - chỉ tải khi nằm trong viewport */}
        {isInView && (
          <img
            src={displaySrc}
            alt={alt}
            loading="lazy"
            onLoad={(e) => setIsLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Overlay biểu tượng phóng to */}
        {isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
            <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox - luôn dùng ảnh kích thước đầy đủ */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setShowLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl w-12 h-12 flex items-center justify-center transition-colors"
            onClick={() => setShowLightbox(false)}
          >
            ×
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {alt && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {alt}
            </p>
          )}
        </div>
      )}
    </>
  );
}
