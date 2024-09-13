import { useState } from "react";
import Image from "next/image";

export default function ProductImage({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="text-center text-gray-600">No images available</div>; // Placeholder if no images exist
  }

  const totalImages = images.length;
  const mainImg = images[currentImageIndex]; // Treat as a string (URL)

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages); // Cycle through images
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages); // Cycle back through images
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={mainImg}  // Use the URL string directly
          alt={`Product Image ${currentImageIndex + 1}`}
          layout="fill"
          objectFit="contain"
          className="transition-transform duration-500 ease-in-out"
        />
      </div>
      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 cursor-pointer bg-white rounded-full shadow-lg hover:bg-gray-200" onClick={handlePrevImage}>
        <span className="text-xl">&#8592;</span> {/* Previous arrow */}
      </div>
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 cursor-pointer bg-white rounded-full shadow-lg hover:bg-gray-200" onClick={handleNextImage}>
        <span className="text-xl">&#8594;</span> {/* Next arrow */}
      </div>
      {/* Dots for indicating the current image */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer ${currentImageIndex === index ? 'text-blue-600' : 'text-gray-400'} text-2xl`}
            onClick={() => setCurrentImageIndex(index)}
          >
            &#8226;
          </span>
        ))}
      </div>
    </div>
  );
}
