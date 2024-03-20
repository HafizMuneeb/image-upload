import Image from "next/image";
import { Dark } from "./Dark";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs';
import Link from "next/link";


const Navbar = async() => {
  const user = await currentUser();
  return (
    <div className="flex items-center px-4 mx-auto p-2 w-full">
      <Image
        src="/album.png"
        width="50"
        height="50"
        alt="icon of this photo album app"
      />
      <Link href="/">
        <h2 className="p-2">Image Gallery</h2>
      </Link>
      <div className="ml-auto flex items-center space-x-4 pl-3">
        <Dark />
        <UserButton />
        <h2>Welcome {user?.username}</h2>
      </div>
    </div>
  );
};

export default Navbar;
