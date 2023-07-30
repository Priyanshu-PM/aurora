"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

export const SubscriptionButton = ({
  proUser = false
}: {
  proUser: boolean;
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
      console.log("[BILLING_ERROR]",error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={proUser ? "default" : "premium"} disabled={loading} onClick={onClick} >
      {proUser ? "Manage Subscription" : "Upgrade"}
      {!proUser && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  )
};