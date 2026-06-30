import {StreamChat} from "stream-chat"
import {StreamClient} from "@stream-io/node-sdk"
import {ENV} from "../lib/env.js"
const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET


if(!apiKey || !apiSecret)
{
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing ");

}
// this is for video calling 
export const streamClient = new StreamClient(apiKey,apiSecret);
// this is for chat features;
export const chatClient = StreamChat.getInstance(apiKey,apiSecret);


export const upsertStreamUser = async (userData)=>{
    try {
        await chatClient.upsertUser(userData)
        console.log("Stream user upserted successfully",userData);
    } catch (error) {
        console.error("Error upserting Stream user:",error);
    }
}
export const deleteStreamUser = async (userId)=>{
    try {
        await chatClient.deleteUser(userId)
        console.log("Stream User deleted successfully",userId);
    
    } catch (error) {
        console.error("Error in deleting Stream user:",error);
    }
};
