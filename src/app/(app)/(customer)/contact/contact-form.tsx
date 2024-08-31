"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { sendEnquiry } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function ContactForm() {
  const [state, dispatch] = useFormState(sendEnquiry, null);
  const search = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (state) {
      toast({
        title: "Enquiry Sent",
        description: "Our team will contact you soom.",
      });
      router.push("/");
    }
  }, [state, router]);
  return (
    <form className="grid gap-4" action={dispatch}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" name="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" placeholder="Enter your phone" name="phone" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" placeholder="Enter your company" name="company" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Enter your message"
          rows={4}
          name="message"
        />
      </div>
      <Input
        className="hidden"
        name="productId"
        defaultValue={search.get("productId")?.toString()}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
