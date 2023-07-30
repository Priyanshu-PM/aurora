"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";

interface MobileSidebarProps {
    apiLimitCount: number,
    proUser: boolean
};

const MobileSidebar = ({
    apiLimitCount = 0,
    proUser = false
}: MobileSidebarProps) => {

    const [isMounted, setIsMounted] = useState(false);

    // for removing the alert in sidebar
    useEffect(()=>{
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

  return (
    <Sheet>
        <SheetTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu/>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <Sidebar
             proUser={proUser}
             apiLimitCount={apiLimitCount}
            />

        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar;