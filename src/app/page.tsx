"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const FormSchema = z.object({
  mobileNumber: z.string().min(10, {
    message: "Mobile number must be at least 10 characters.",
  }),
  textMessage: z.string().min(1, {
    message: "Text message cannot be empty.",
  }),
});

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobileNumber: "",
      textMessage: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const encodedMessage = encodeURIComponent(data.textMessage);
    toast.success("Opening WhatsApp...");
    window.open(
      `https://wa.me/${data.mobileNumber}?text=${encodedMessage}`,
      "_blank"
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter mobile number" {...field} />
              </FormControl>
              <FormDescription>
                Enter the mobile number you want to send a message to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="textMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Message</FormLabel>
              <FormControl>
                <Input placeholder="Enter text message" {...field} />
              </FormControl>
              <FormDescription>
                Enter the message you want to send.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
}
