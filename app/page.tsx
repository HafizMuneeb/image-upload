// @ts-nocheck
"use client"

import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function Home() {
  const [imageId, setImageId] = useState("");
  const router = useRouter();

  const handleUploadSuccess = (result: UploadResult) => {
    setImageId(result.info.public_id);
    router.push("/gallery");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button asChild className="bg-blue-500 text-white hover:bg-blue-300">
        <CldUploadButton
          onUpload={handleUploadSuccess} // Use the handleUploadSuccess function
          uploadPreset="dxytxxfq"
        />
      </Button>

      {imageId && (
        <CldImage
          width="500"
          height="300"
          src={imageId}
          sizes="100vw"
          alt="Description of my image"
        />
      )}
    </main>
  );
}