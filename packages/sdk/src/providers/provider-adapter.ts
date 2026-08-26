import { TraceData } from "../types";

export interface ProviderAdapter {
    extract(request: unknown, response: unknown): Partial<TraceData>;
}