"use client";

import Link from "next/link";
import { Image, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { createBanner } from "@/lib/actions/admin";

export default function CreateBannerForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createBanner, initialState);

  const [image, setImage] = useState<string>("");

  const handleImage = (files: FileList | null) => {
    if (!files) return;
    if (files.length <= 0) return;
    let file = files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImage((fileReader.result as string) ?? "");
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <Label htmlFor="name" className="mb-2 block text-sm font-medium">
            Banner Url
          </Label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Input
                id="name"
                name="url"
                type="text"
                placeholder="Enter banner destination url"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.url ? (
            <div
              id="name-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.url.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <Label htmlFor="image" className="mb-2 block text-sm font-medium">
            Image
          </Label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Input
                id="image"
                type="file"
                accept="image/*"
                placeholder="Enter product units for sale"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="stock-error"
                onChange={(e) => handleImage(e.target.files)}
              />
              <Input
                name="image"
                type="text"
                className="hidden"
                value={image}
              />
              {
                // For some reason it gives a warning even though I am not using the image tag
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              }
            </div>
          </div>
          {state.errors?.imageUrl ? (
            <div
              id="price-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.imageUrl.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {state.message ? (
          <div
            id="message-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            <p key={state.message}>{state.message}</p>
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
