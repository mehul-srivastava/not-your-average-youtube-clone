"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useRef } from "react";

import { Button } from "@repo/shadcn/components/ui/button";
import { Textarea } from "@repo/shadcn/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/shadcn/components/ui/form";
import { Input } from "@repo/shadcn/components/ui/input";
import { ClipboardCopyIcon } from "lucide-react";
import toast from "react-hot-toast";

const page = () => {
  console.log(window);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        console.log(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam: ", error);
      }
    };

    startVideo();
  }, []);

  return (
    <div className="p-10">
      <div className="flex gap-6">
        <div className="relative w-full rounded-md">
          <span className="absolute rounded-tl-[inherit] bg-gray-800 p-2">
            Preview
          </span>
          <video
            ref={videoRef}
            autoPlay
            className="h-[450px] w-full rounded-[inherit] bg-black"
          />
        </div>
        <LiveStreamMetadata />
      </div>
    </div>
  );
};

const formSchema = z.object({
  username: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
});

const LiveStreamMetadata = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Mehul's Live Stream" {...field} />
                </FormControl>
                <FormDescription>
                  This is your live stream's name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="We will be discussing about global warming issues."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your live stream's description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="space-y-1">
            <FormLabel>Paste RTMP URL in OBS</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  value="rtmp://rtmp.youtube.mehuls.in/f9db27f4-dc9f-4c5b-b0e0-fe3a0934680c"
                  className="text-muted-foreground cursor-pointer select-none"
                />
                <ClipboardCopyIcon
                  onClick={() => toast.success("Copied to clipboard!")}
                  className="absolute right-4 top-3 h-4 w-4 cursor-pointer"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
          <Button type="submit" size={"sm"} className="text-xs">
            Start Live Stream
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default page;
