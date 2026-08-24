import { TraceData } from "../types";
import { ProviderAdapter } from "./provider-adapter";

export class OpenAIAdapter implements ProviderAdapter {
    extract(response: unknown): Partial<TraceData> {
        throw new Error("Method not implemented.");
    }
    
}