import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";
import { CheckCheckIcon } from "lucide-react";

export default function ChatBubble({
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
