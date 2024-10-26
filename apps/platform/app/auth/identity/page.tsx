import React from "react";
import { signIn, auth } from "@/auth";
import { Button } from "@repo/shadcn/components/ui/button";
import Image from "next/image";

interface IPageProps {
  searchParams: { redirectTo: string };
}

const page = async ({ searchParams }: IPageProps) => {
  const session = await auth();

  if (!!session) {
    console.log(session.user?.image);
  }

  async function loginWithGoogle() {
    "use server";
    await signIn("google");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="relative h-full w-full">
        <video
          src="/authentication-background-video.mp4"
          loop={true}
          autoPlay={true}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-[#000000b3]">
          <form action={loginWithGoogle}>
            <Button className="flex items-center gap-2 font-thin">
              <Image
                src="/google-logo.webp"
                height={24}
                width={24}
                alt="google logo"
              />
              <p className="text-sm">Verify Account</p>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
