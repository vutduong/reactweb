import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";

export default function GlideCarousel({perView = 2}) {
  const glideRef = useRef(null);

  const images = [
    "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/5b/25/5b259698dfd96d051cf2b7e18829c1c4.png",
    "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/cf/92/cf9200e5a34ae65145591563ae27f239.png",
    "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/ec/03/ec03ce40524b50aa5c42098e6d99cf27.png"
  ];

  useEffect(() => {
    const glide = new Glide(glideRef.current, {
      type: "carousel",
      perView, // Show only one image per view
      gap: 15,
    });

    glide.mount();
    return () => glide.destroy(); // Cleanup when unmounting
  }, [perView]);

  return (
    <div className="second-section mt-5">
      <div className="bg-cover flex xl:mt-3 justify-center items-center">
        <div className="glide relative" ref={glideRef}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {images.map((image, idx) => (
                <li key={idx} className="glide__slide">
                  <img className="rounded-lg w-full" src={image} alt={`Slide ${idx + 1}`} />
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Buttons */}
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
      </div>
    </div>
  );
}
