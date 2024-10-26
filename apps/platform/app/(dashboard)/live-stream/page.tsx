"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@repo/shadcn/components/ui/button";
import { Textarea } from "@repo/shadcn/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/shadcn/components/ui/form";
import { Input } from "@repo/shadcn/components/ui/input";
import { ClipboardCopyIcon } from "lucide-react";
import toast, { LoaderIcon } from "react-hot-toast";
import axios from "axios";

const page = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let stream: MediaStream;
    const startVideo = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam: ", error);
      }
    };

    startVideo();

    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
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
            className="h-full w-full rounded-[inherit] bg-black"
          />
        </div>
        <LiveStreamMetadata />
      </div>
    </div>
  );
};

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  rtmpUrl: z.string(),
  rtmpSecretKey: z.string(),
});

const LiveStreamMetadata = () => {
  const rtmpUrl =
    process.env.NODE_ENV === "production"
      ? "rtmp://rtmp.youtube.mehuls.in/live"
      : "rtmp://localhost:1935/live";

  const rtmpSecretKey = uuidv4().split("-").slice(0, -1).join("-");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      rtmpUrl: rtmpUrl,
      rtmpSecretKey: rtmpSecretKey,
    },
  });

  const [isPending, startTransition] = useTransition();

  const rtmpUrlInputRef = useRef<HTMLInputElement | null>(null);
  const rtmpSecretKeyInputRef = useRef<HTMLInputElement | null>(null);

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const response = await axios.post("/api/live-stream", values);
        const data = await response.data;
        toast.success("You can start streaming from OBS now!");
      } catch (e: any) {
        toast.error("Could not start the stream!");
        console.log(e);
      }
    });
  }

  function copyToClipboard(
    ref: React.MutableRefObject<HTMLInputElement | null>,
  ) {
    navigator.clipboard.writeText(ref?.current?.value ?? "");
    toast.success("Copied to clipboard!");
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Mehul's Live Stream" {...field} />
                </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="rtmpUrl"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel htmlFor={field.name}>RTMP Stream URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        readOnly={true}
                        ref={rtmpUrlInputRef}
                        className="text-muted-foreground cursor-pointer select-none"
                      />
                      <ClipboardCopyIcon
                        onClick={() => copyToClipboard(rtmpUrlInputRef)}
                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer"
                        aria-label="Copy to clipboard"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rtmpSecretKey"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel htmlFor={field.name}>RTMP Stream Key</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        readOnly={true}
                        ref={rtmpSecretKeyInputRef}
                        className="text-muted-foreground cursor-pointer select-none"
                        placeholder="Enter secret stream key"
                      />
                      <ClipboardCopyIcon
                        onClick={() => copyToClipboard(rtmpSecretKeyInputRef)}
                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer"
                        aria-label="Copy to clipboard" // Accessibility for the icon
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={isPending}
            type="submit"
            size={"sm"}
            className="text-xs"
          >
            {isPending && <LoaderIcon className="mr-2" />}
            Start Live Stream
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default page;
