"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error("User is not authenticated");
    if (!apiKey) throw new Error("Stream API key not found");
    if (!apiSecret) throw new Error("Stream API secret not found");

    const client = new StreamClient(apiKey, apiSecret);
    const vailidity = 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 600;
    const token = client.generateUserToken({user_id: user.id, vailidity, issuedAt});
    return token;
}