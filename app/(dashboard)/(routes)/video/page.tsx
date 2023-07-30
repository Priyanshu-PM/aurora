"use client";

import { useState } from 'react';
import axios from 'axios';
import * as z from "zod";
import { useForm } from "react-hook-form";

import Heading from "@/components/heading";
import {
    Form, 
    FormControl, 
    FormField, 
    FormItem
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { VideoIcon } from 'lucide-react';

import { formSchema } from "./constants";
import { Button } from "@/components/ui/button";

import { useRouter } from 'next/navigation';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { UseProModal } from '@/hooks/use-pro-modal';
import { toast } from 'react-hot-toast';


const VideoPage = () => {

    const router = useRouter();
    const proModal = UseProModal();
    const [video, setVideo] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        // submitting the prompt to the backend
        try {
            setVideo(undefined);
            const response = await axios.post("/api/video", values);

            setVideo(response.data[0]);
            form.reset();
        } 
        catch(error: any) {

            if(error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong")
            }
        } 
        finally {
            router.refresh();
        }
        console.log(values);
    };

    return (
    <div>
        <Heading 
            title="Video Generation"
            desc="Turn your ideas into motion"
            icon= {VideoIcon}
            iconColor="text-orange-700"
            bgColor="bg-orange-700/10"
        />
        <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                        rounded-lg
                        border
                        w-full
                        p-3
                        md:px-6
                        focus-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2"
                    >
                    <FormField
                    name="prompt"
                    render={({field})=> (
                        <FormItem 
                         className="col-span-12 lg:col-span-10">
                            <FormControl className="m-0 p-0">
                                <Input
                                 className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                 disabled = {isLoading}
                                 placeholder="Supercars racing in the desert"
                                 {...field}
                                />
                            </FormControl>
                         </FormItem>
                    )}
                    />
                    <Button
                     className="col-span-12 lg:col-span-2 w-full" 
                     disabled= {isLoading}
                    
                    >
                        Generate
                    </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {
                    isLoading && (
                        <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                            <Loader />
                        </div>
                    )
                }
                { !video && !isLoading && (
                            <Empty label='No Video Generated'/>
                )}
                {
                    video && (
                        <video controls className='w-full aspect-video mt-8 rounded-lg border bg-black'>
                            <source src={video}/>
                        </video>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default VideoPage;