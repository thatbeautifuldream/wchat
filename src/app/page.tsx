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
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";

const FormSchema = z.object({
  mobileNumber: z.string().min(10, {
    message: "Mobile number must be at least 10 characters.",
  }),
  textMessage: z.string().optional(),
});

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function ChatBubble({
  mobileNumber,
  textMessage,
  timestamp,
  className,
}: {
  mobileNumber: string;
  textMessage: string;
  timestamp: string;
  className?: string;
}) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn("flex items-end space-x-2", className)}>
              <div className="bg-[#075E54] text-white rounded-lg p-2 max-w-xs">
                <div className="flex items-center justify-between ml-2">
                  <span className="text-sm font-medium">{textMessage}</span>
                  <span className="text-xs text-gray-300 ml-2 self-end">
                    {dayjs(timestamp).format("MMM D, h:mm A")}
                  </span>
                  <CheckCheckIcon className="w-4 h-4 text-blue-500 ml-1" />
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="text-xs p-2 bg-[#075E54] text-white rounded-lg max-w-xs">
            <p>{mobileNumber}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobileNumber: "",
      textMessage: "",
    },
  });

  const suggestions = ["Hey", "What's up?", "How are you?"];
  const [savedMessages, setSavedMessages] = useState<
    { mobileNumber: string; textMessage: string; timestamp: string }[]
  >([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("savedMessages");
    if (storedMessages) {
      setSavedMessages(JSON.parse(storedMessages));
    }
  }, []);

  function handleSuggestionClick(suggestion: string) {
    form.setValue("textMessage", suggestion);
  }

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

    const timestamp = new Date().toLocaleString();
    const newMessage = {
      mobileNumber: data.mobileNumber,
      textMessage: data.textMessage || "",
      timestamp,
    };
    const updatedMessages = [...savedMessages, newMessage];
    setSavedMessages(updatedMessages);
    localStorage.setItem("savedMessages", JSON.stringify(updatedMessages));
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center float-top h-screen">
        <Card className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-8">
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
                      <Textarea
                        placeholder="Enter text message"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-2 mb-4">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 text-nowrap"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Send
              </Button>
            </form>
          </Form>
        </Card>
        {savedMessages.length > 0
          ? savedMessages.map((message, index) => (
              <ChatBubble
                key={index}
                mobileNumber={message.mobileNumber}
                textMessage={message.textMessage}
                timestamp={message.timestamp}
                className="mt-8"
              />
            ))
          : null}
      </div>
      <div className="absolute bottom-0 w-full text-center text-xs text-green-900 py-4">
        Built by Makkan Labs &copy; {new Date().getFullYear()}
      </div>
    </>
  );
}
