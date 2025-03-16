import { useEffect, useState, useRef } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";

const ProductGlide = ({ thumbnailImages = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainGlideRef = useRef(null);
  const thumbGlideRef = useRef(null);

  useEffect(() => {
    if (!thumbnailImages.length) return; // Prevent errors when images are empty

    const mainGlideElement = document.querySelector(".main-glide");
    const thumbGlideElement = document.querySelector(".thumb-glide");

    if (!mainGlideElement || !thumbGlideElement) return;

    mainGlideRef.current = new Glide(mainGlideElement, {
      type: "carousel",
      perView: 1,
      focusAt: "center",
      gap: 10,
    });

    thumbGlideRef.current = new Glide(thumbGlideElement, {
      type: "carousel",
      perView: Math.min(thumbnailImages.length, 5),
      focusAt: "center",
      gap: 10,
      breakpoints: {
        768: { perView: 3 },
        480: { perView: 2 },
      },
    });

    mainGlideRef.current.on("move.after", () => {
      setSelectedIndex(mainGlideRef.current.index);
    });

    mainGlideRef.current.mount();
    thumbGlideRef.current.mount();

    return () => {
      mainGlideRef.current?.destroy();
      thumbGlideRef.current?.destroy();
    };
  }, [thumbnailImages]);

  const goToSlide = (index) => {
    if (mainGlideRef.current) {
      mainGlideRef.current.go(`=${index}`);
      setSelectedIndex(index);
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg">
      {/* Main Image Display */}
      <div className="relative w-full main-glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {thumbnailImages.map((image, index) => (
              <li key={index} className="glide__slide">
                <img
                  src={image}
                  className="block w-full h-96 object-cover rounded-lg"
                  alt={`Thumbnail ${index}`}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Main Carousel Navigation */}
        <div data-glide-el="controls">
          <button
            className="glide__arrow glide__arrow--left absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full"
            data-glide-dir="<"
          >
            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 6 10" fill="none">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 1 1 5l4 4" />
            </svg>
          </button>
          <button
            className="glide__arrow glide__arrow--right absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full"
            data-glide-dir=">"
          >
            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 6 10" fill="none">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 9l4-4-4-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="thumb-glide relative mt-5 w-full">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides flex">
            {thumbnailImages.map((image, index) => (
              <li key={index} className="glide__slide">
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className={`w-14 h-14 cursor-pointer rounded-lg border-2 transition ${
                    selectedIndex === index ? "border-blue-500 scale-110" : "border-gray-300"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Thumbnail Navigation */}
        <div
          data-glide-el="controls"
          className="absolute inset-0 flex items-center justify-between px-2 z-10 pointer-events-none"
        >
          <button
            className="glide__arrow glide__arrow--left bg-white/50 hover:bg-white p-2 rounded-full shadow-md pointer-events-auto"
            data-glide-dir="<"
          >
            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 6 10" fill="none">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 1 1 5l4 4" />
            </svg>
          </button>
          <button
            className="glide__arrow glide__arrow--right bg-white/50 hover:bg-white p-2 rounded-full shadow-md pointer-events-auto"
            data-glide-dir=">"
          >
            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 6 10" fill="none">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 9l4-4-4-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGlide;
