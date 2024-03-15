import Image from "next/image";
import { Dark } from "./Dark";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex h-16 items-center px-4 container mx-auto p-2">
      <Image
        src="/album.png"
        width="50"
        height="50"
        alt="icon of this photo album app"
      />
      <h2 className="p-2">Image Gallery</h2>
      <div className="ml-auto flex items-center space-x-4 pl-3">
        <Dark />
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
