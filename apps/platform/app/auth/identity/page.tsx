import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@repo/shadcn/components/ui/button";
import { signIn, auth } from "@/auth";
import prisma from "@/lib/prisma";

interface IPageProps {
  searchParams: { redirectTo: string; signedIn?: string };
}

const page = async ({ searchParams }: IPageProps) => {
  if (!searchParams.redirectTo) {
    redirect("/");
  }

  const session = await auth();
  const sessionRedirectUrl = `/auth/identity?signedIn=true&redirectTo=${searchParams.redirectTo}`;

  if (session) {
    if (!searchParams.signedIn) redirect(searchParams.redirectTo);

    const user = await prisma.user.findFirst({
      where: { id: session.user?.id! },
      select: { id: true },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          id: session.user?.id!,
          name: session.user?.name!,
          email: session.user?.email!,
          imageUrl: session.user?.image!,
        },
      });
    }

    redirect(searchParams.redirectTo);
  }

  async function loginWithGoogle() {
    "use server";
    await signIn("google", {
      redirectTo: sessionRedirectUrl,
    });
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
          <form
            action={loginWithGoogle}
            className="flex flex-col items-center gap-2"
          >
            <Button
              className="flex items-center gap-2 font-thin"
              disabled={!!session}
            >
              <Image
                src="/google-logo.webp"
                height={24}
                width={24}
                alt="google logo"
              />
              <p className="text-sm">Verify Account</p>
            </Button>
            {!!session && (
              <p className="text-center text-sm">You need to logout first!</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
