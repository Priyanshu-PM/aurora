import { Settings } from "lucide-react";
import Heading from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const proUser = await checkSubscription();

  return ( 
    <div>
      <Heading
        title="Settings"
        desc="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {proUser ? "You are currently on a Pro plan." : "You are currently on a free plan."}
        </div>
        <SubscriptionButton proUser={proUser} />
      </div>
    </div>
   );
}
 
export default SettingsPage;