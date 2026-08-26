import { TraceData } from "../types";
import { ProviderAdapter } from "./provider-adapter";

export class OpenAIAdapter implements ProviderAdapter {
  extract(request: unknown, response: unknown): Partial<TraceData> {
    const requestData = request as any;
    const responseData = response as any;

    return {
      input: { content: requestData.message },
      inputTokens: responseData.usage.input_tokens,
      outputTokens: responseData.usage.output_tokens,
      totalTokens: responseData.usage.total_tokens,
      output: { content: responseData.output_text },
    };
  }
}
