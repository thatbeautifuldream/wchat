"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function Home() {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSend = () => {
    if (mobileNumber) {
      window.open(`https://wa.me/${mobileNumber}`, "_blank");
    }
  };

  return (
    <Card className="flex items-center justify-center h-screen">
      <div className="bg-white flex flex-col gap-y-4 p-8 rounded-lg shadow-lg max-w-md w-full">
        <Input
          type="text"
          placeholder="Enter mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <Button className="w-full" onClick={handleSend}>
          Send
        </Button>
      </div>
    </Card>
  );
}
