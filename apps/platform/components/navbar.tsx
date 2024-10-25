import Link from "next/link";
import LiveStreamButton from "./live-stream-button";
import UploadButton from "./upload-button";

import { Button } from "@repo/shadcn/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex h-full w-full items-center justify-between border-b border-b-gray-700/70 px-5 text-white">
      <Link href="/">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
          className="block h-8 w-8 cursor-pointer"
          alt="youtube clone logo"
        />
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/live-stream">
          <Button variant="destructive" size="sm" className="text-xs">
            Start Live
          </Button>
        </Link>
        <Button variant="secondary" size="sm" className="text-xs">
          Upload
        </Button>
        <img
          src="https://random.imagecdn.app/100/300"
          className="h-9 w-9 rounded-md"
          alt="user image"
        />
      </div>

      {/* <UploadButton />
      <LiveStreamButton /> */}
    </nav>
  );
};

export default Navbar;
