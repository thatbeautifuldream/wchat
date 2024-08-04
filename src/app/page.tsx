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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const FormSchema = z.object({
  mobileNumber: z.string().min(10, {
    message: "Mobile number must be at least 10 characters.",
  }),
  textMessage: z.string().optional(),
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
    if (!data.mobileNumber) {
      toast.error("Mobile number is required.");
      return;
    }
    const encodedMessage = encodeURIComponent(data.textMessage || "");
    window.open(
      `https://wa.me/${data.mobileNumber}?text=${encodedMessage}`,
      "_blank"
    );
  }

  return (
    <>
      <div className="flex items-start justify-center h-screen bg-green-500">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="91987654321" {...field} />
                    </FormControl>
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
                      <Textarea placeholder="Enter text message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Send
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="absolute bottom-0 w-full text-center text-xs text-green-900 py-4">
        Built by Makkan Labs &copy; {new Date().getFullYear()}
      </div>
    </>
  );
}
