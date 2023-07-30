import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

import  { increaseApiLimit, checkApiLimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. Your expertise as code generator will be valuable to the user, given a description about a particular question you have to generate a simple, modular and efficient code for the user. You must answer only in markdown snippets: Use code comments fro explanation."
}

export async function POST(
    req: Request
) {
    try {

        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if(!userId)
        {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!configuration.apiKey)
        {
            return new NextResponse("OpenAI key not configured !!", {status: 500})
        }

        if(!messages) {
            return new NextResponse("Messages are required !", {status: 400})
        }

        const freeTrial = await checkApiLimit();
        const proUser = await checkSubscription();

        if(!freeTrial && !proUser) {
            return new NextResponse("Free trial has expired", {status: 403})
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages],
        });

        if(!proUser) {
            await increaseApiLimit();
        }

        return NextResponse.json(response.data.choices[0].message)

    } catch(error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}