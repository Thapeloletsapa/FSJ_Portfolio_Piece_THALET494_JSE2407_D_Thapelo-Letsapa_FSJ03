import { useState } from "react";
import Image from "next/image";

export default function ProductImage({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div>No images available</div>; // Placeholder if no images exist
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
    <div className="relative">
      <div className="relative h-96 w-full">
        <Image
          src={mainImg}  // Use the URL string directly
          alt={`Product Image ${currentImageIndex + 1}`}
          layout="fill"
          objectFit="contain"
          className="transform duration-500 ease-in-out"
        />
      </div>
      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-0 p-2 cursor-pointer" onClick={handlePrevImage}>
        &#8592; {/* Previous arrow */}
      </div>
      <div className="absolute top-1/2 right-0 p-2 cursor-pointer" onClick={handleNextImage}>
        &#8594; {/* Next arrow */}
      </div>
      {/* Dots for indicating the current image */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <span
            key={index}
            className={`mx-1 cursor-pointer ${currentImageIndex === index ? 'text-blue-600' : 'text-gray-400'}`}
            onClick={() => setCurrentImageIndex(index)}
          >
            &#8226;
          </span>
        ))}
      </div>
    </div>
  );
}
