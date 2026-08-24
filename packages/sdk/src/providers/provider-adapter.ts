import { TraceData } from "../types";

export interface ProviderAdapter {
    extract(response: unknown): Partial<TraceData>;
}