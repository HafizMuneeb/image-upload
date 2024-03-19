"use client";

import { useState } from "react";
import { ImageGrid } from "@/components/image-grid";
import { SearchResult } from "./page";
import { CloudinaryImage } from "@/components/cloudinary-image";
import Modal from "@/components/Modal"; // Import your Modal component

export default function GalleryGrid({ images }: { images: SearchResult[] }) {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const handleImageClick = (publicId: string) => {
    setSelectedImageId(publicId);
  };

  const handleCloseModal = () => {
    setSelectedImageId(null);
  };

  return (
    <>
      <ImageGrid
        images={images}
        getImage={(imageData: SearchResult) => (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="400"
            height="300"
            alt="an image of something"
            onClick={() => handleImageClick(imageData.public_id)}
          />
        )}
      />

      {selectedImageId && (
        <Modal
          imageUrl={`https://res.cloudinary.com/dluvzoyjv/image/upload/${selectedImageId}`}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
