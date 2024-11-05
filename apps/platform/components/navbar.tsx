import Link from "next/link";
import Image from "next/image";

import { Button } from "@repo/shadcn/components/ui/button";
import { auth } from "@/auth";
import UploadButton from "./upload-button";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex h-full w-full items-center justify-between border-b border-b-gray-700/70 px-5 text-white">
      <Link
        href="/auth/identity?redirectTo=/"
        className="flex items-center gap-4"
      >
        {!session && <small>Login</small>}
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/live-stream">
          <Button variant="destructive" size="sm" className="text-xs">
            Start Live
          </Button>
        </Link>
        <UploadButton isLoggedIn={!!session} />
        {!!session && (
          <Image
            width={36}
            height={36}
            src={session.user?.image!}
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
