import Link from "next/link";
import Image from "next/image";

import { Button } from "@repo/shadcn/components/ui/button";
import { auth } from "@/auth";
import UploadButton from "./upload-button";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex h-full w-full items-center justify-between border-b border-b-gray-700/70 px-5 text-white">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src="/logo.png"
          width={32}
          height={32}
          className="block h-8 w-8 cursor-pointer"
          alt="youtube clone logo"
        />
        {!session && <small>Unverified</small>}
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/live-stream">
          <Button variant="destructive" size="sm" className="text-xs">
            Start Live
          </Button>
        </Link>
        <UploadButton />
        {!!session && (
          <Image
            width={36}
            height={36}
            src="https://lh3.googleusercontent.com/a/ACg8ocKYqW-Ay5b3ez8Ylf3iQ7dFH6MjO30RAioPFLrXl6kZcgPuDUBn=s96-c"
            className="h-9 w-9 rounded-md"
            alt="user image"
          />
        )}
      </div>

      {/* 
      <LiveStreamButton /> */}
    </nav>
  );
};

export default Navbar;
