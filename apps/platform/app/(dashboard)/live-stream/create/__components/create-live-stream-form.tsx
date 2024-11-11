"use client";

import React, { useRef, useTransition } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { LoaderIcon } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleHelpIcon, ClipboardCopyIcon } from "lucide-react";

import axiosInstance from "@/lib/axios";
import { Button } from "@repo/shadcn/components/ui/button";
import { Textarea } from "@repo/shadcn/components/ui/textarea";
import { Input } from "@repo/shadcn/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/shadcn/components/ui/form";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  thumbnail: z.string(),
  rtmpUrl: z.string(),
  rtmpSecretKey: z.string(),
});

const CreateLiveStreamForm = () => {
  const rtmpUrl = process.env.NODE_ENV === "production" ? "rtmp://rtmp.youtube.mehuls.in/live" : "rtmp://localhost:1935/live";
  const rtmpSecretKey = uuidv4().split("-").slice(0, -1).join("-");

  const rtmpSecretKeyInputRef = useRef<HTMLInputElement | null>(null);
  const rtmpUrlInputRef = useRef<HTMLInputElement | null>(null);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      rtmpUrl: rtmpUrl,
      rtmpSecretKey: rtmpSecretKey,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const response = await axiosInstance.post("/artifacts/create/live-stream", values);
        router.push(`/live-stream/${response.data.streamId}`);
        toast.success("You can start streaming from OBS now!");
      } catch {
        toast.error("Something went wrong!");
      }
    });
  }

  function copyToClipboard(ref: React.MutableRefObject<HTMLInputElement | null>) {
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
            name="thumbnail"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <Input placeholder="https://google.com/some-random-thumbnail.png" {...field} />
                    <a target="_blank" href="https://www.google.com/search?q=freecodecamp+youtube+thumbnail+images&udm=2">
                      <CircleHelpIcon className="h-4" />
                    </a>
                  </div>
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
                  <Textarea placeholder="We will discuss about how to deploy a Next.js app to VPS." {...field} />
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

          <Button disabled={isPending} type="submit" size={"sm"} className="text-xs">
            {isPending && <LoaderIcon className="mr-2" />}
            Start Live Stream
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateLiveStreamForm;
