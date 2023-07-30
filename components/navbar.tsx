import { UserButton } from "@clerk/nextjs/app-beta/client";

import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar =  async () => {

  const apiLimitCount = await getApiLimitCount();
  const proUser = await checkSubscription();

  return (
    <div className="flex items-center p-4">
            <MobileSidebar 
              proUser={proUser}
              apiLimitCount={apiLimitCount}
            />
        <div className="flex w-full justify-end">
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default Navbar;