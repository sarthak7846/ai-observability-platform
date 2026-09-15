import dotenv from "dotenv";
import path from 'path';
import { Observe } from "@observe/sdk";
import { generateTrace } from "./simulator";

dotenv.config({ path: path.resolve(import.meta.dirname, '../../../.env') });

const observe = new Observe({
    apiKey: process.env.OBSERVE_API_KEY!,
    baseUrl: process.env.OBSERVE_API_URL!,
});

const response = await generateTrace(observe);

console.log("result", JSON.stringify(response, null, 2));