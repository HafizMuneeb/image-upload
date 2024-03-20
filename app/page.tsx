// @ts-nocheck

"use client"

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";
import Tag from "@/components/Tag";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function Home() {
  const router = useRouter();
  const [imageId, setImageId] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");

  const handleImageUpload = (result: UploadResult) => {
    setImageId(result.info.public_id);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission behavior
      const trimmedInput = tagInput.trim();
      if (trimmedInput !== "") {
        setTags([...tags, { text: trimmedInput, color: getRandomColor() }]);
        setTagInput("");
      }
    }
  };

  const getRandomColor = () => {
    const colors = ["red", "blue", "green"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleSubmit = async () => {
    try {
      const tagsString = tags.map((tag) => tag.text).join(", "); // Convert tags array to string
      const response = await axios.post("/api/image", {
        imageId,
        description,
        tags: tagsString, // Send tags as a string
      });
      console.log("Image and data submitted successfully:", response.data);
      toast.success("Image Added Succesfully")
      router.push("/gallery")
    } catch (error) {
      console.error("Error submitting image and data:", error);
    }
  };

  return (
    <motion.main 
      className="flex min-h-screen flex-col items-center gap-8 p-24"
      initial={{ opacity: 0 }} // Initial animation state
      animate={{ opacity: 1 }} // Animation when component is mounted
      exit={{ opacity: 0 }} // Animation when component is unmounted
    >
      <h1 className="text-3xl font-bold mb-4">Welcome to Image Gallery</h1>
      <motion.div 
        className="mb-8 flex flex-col items-center justify-center gap-2"
        initial={{ opacity: 0, y: -50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animation when component is mounted
        transition={{ delay: 0.5 }} // Delay animation
      >
        <p className="text-lg">Upload an image:</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          <CldUploadButton
            onUpload={handleImageUpload}
            uploadPreset="dxytxxfq"
          />
        </button>
      </motion.div>

      {imageId && (
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -50 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Animation when component is mounted
          transition={{ delay: 0.8 }} // Delay animation
        >
          <CldImage
            width="500"
            height="300"
            src={imageId}
            sizes="100vw"
            alt="Description of my image"
          />
        </motion.div>
      )}

      <div className="flex flex-col">
        <form className="flex flex-col">
          <label htmlFor="description" className="text-lg">Description</label>
          <textarea
            id="description"
            rows={4}
            className="border rounded-md p-2 mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mb-4">
            <label htmlFor="tags" className="text-lg">Tags</label>
            <input
              type="text"
              id="tags-input"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border rounded-md p-2"
            />
            <div id="tags-container" className="mt-2">
              {tags.map((tag, index) => (
                <Tag key={index} text={tag.text} color={tag.color} />
              ))}
            </div>
          </div>
        </form>
      </div>
      <Button 
        onClick={handleSubmit} 
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Submit
      </Button>
      <ToastContainer />
    </motion.main>
  );
}
