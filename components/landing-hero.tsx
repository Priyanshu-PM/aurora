"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {

    const { isSignedIn } = useAuth();

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5l md:text-6xl lg:text-7xl">
                <h1 className="">The Best AI tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r  from-blue-600 to-pink-600"> 
                    <TypewriterComponent 
                        options={{
                            strings: [
                                "Chatbot",
                                "Photo Generation",
                                "Code Generation",
                                "Music Generation",
                                "Video Generation",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                    Create content using Aurora 10X faster
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
                    <Button variant="premium" className="md:text-lg p-4 md:p-6  rounded-full font-semibold">
                        Get Started for free
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No Credit-card required.
            </div>
        </div>
    )
}