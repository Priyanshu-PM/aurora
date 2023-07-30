"use client";

import { useState } from 'react';
import axios from 'axios';
import * as z from "zod";
import { useForm } from "react-hook-form";
import Image from 'next/image';

import Heading from "@/components/heading";
import {
    Form, 
    FormControl, 
    FormField, 
    FormItem
} from "@/components/ui/form";

import {Download} from 'lucide-react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
  } from "@/components/ui/select"

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { ImageIcon } from 'lucide-react';

import { Button } from "@/components/ui/button";

import { Card, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';

import { 
    amountOptions, 
    resolutionOptions, 
    formSchema 
} from './constants';

import { cn } from '@/lib/utils';
import { UseProModal } from '@/hooks/use-pro-modal';
import { toast } from 'react-hot-toast';


const ImagePage = () => {

    const router = useRouter();
    const proModal = UseProModal();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        // submitting the prompt to the backend
        try {
            setImages([]);

            const response = await axios.post("/api/image", values);

            const urls = response.data.map((image: {url: string}) => image.url);
            setImages(urls);
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
            title="Image Generation"
            desc="Generate unique images using AI"
            icon= {ImageIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
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
                         className="col-span-12 lg:col-span-6">
                            <FormControl className="m-0 p-0">
                                <Input
                                 className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                 disabled = {isLoading}
                                 placeholder="A picture of Space, gallaxies and cosmos"
                                 {...field}
                                />
                            </FormControl>
                         </FormItem>
                    )}
                    />
                    <FormField 
                     control={form.control}
                     name="amount"
                     render={({field})=> (
                        <FormItem className='col-span-12 lg:col-span-2 '>
                            <Select
                             disabled={isLoading}
                             onValueChange={field.onChange}
                             value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="">
                                        <SelectValue defaultValue={field.value} />
                                    </SelectTrigger>
                                    
                                </FormControl>
                                <SelectContent>
                                       {
                                            amountOptions.map((option)=> (
                                                <SelectItem
                                                 key={option.value}
                                                 value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            )) }
                                </SelectContent>
                            </Select>
                        </FormItem>
                     )}
                    />
                    <FormField 
                     control={form.control}
                     name="resolution"
                     render={({field})=> (
                        <FormItem className='col-span-12 lg:col-span-2 '>
                            <Select
                             disabled={isLoading}
                             onValueChange={field.onChange}
                             value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue defaultValue={field.value} />
                                    </SelectTrigger>
                                    
                                </FormControl>
                                <SelectContent>
                                       {
                                            resolutionOptions.map((resolution)=> (
                                                <SelectItem
                                                 key={resolution.value}
                                                 value={resolution.value}
                                                >
                                                    {resolution.label}
                                                </SelectItem>
                                            )) }
                                </SelectContent>
                            </Select>
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
                        <div className='p-20'>
                            <Loader />
                        </div>
                    )
                }
                { images.length === 0 && !isLoading && (
                            <Empty label='No Images Generated.'/>
                )}
                <div className='flex flex-col flex-reverse gap-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
                        {
                            images.map((src)=> (
                                <Card 
                                 key={src}
                                 className='rounded-lg overflow-hidden'
                                >
                                    <div className='relative aspect-square'>
                                        <Image
                                         alt='image'
                                         fill
                                         src={src} 
                                        />
                                    </div>
                                    <CardFooter className='p-2'>
                                        <Button
                                         variant="secondary"
                                         className='w-full'
                                         onClick={()=> window.open(src)}
                                        >
                                            <Download className='h-4 w-4 mr-2'/>
                                            Download
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImagePage