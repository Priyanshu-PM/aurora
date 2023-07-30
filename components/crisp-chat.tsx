"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(()=>{
        Crisp.configure("072c8ab8-f30c-42a9-b64d-d73f6b0a4e96");
    }, []);

    return null;
}