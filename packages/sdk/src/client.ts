import { OpenAIAdapter } from "./providers/open-ai-adapter";
import { ProviderAdapter } from "./providers/provider-adapter";
import { Trace } from "./trace";
import { Transport } from "./transport";
import { ObserveConfig, StartTracePayload } from "./types";

export class Observe {
  private readonly transport: Transport;
  private readonly adapters: Record<string, ProviderAdapter>;

  constructor(config: ObserveConfig) {
    this.transport = new Transport(
      config.apiKey,
      config.baseUrl ?? "http://localhost:8000",
    );
    this.adapters = {
      openai: new OpenAIAdapter(),
    };
  }

  startTrace(options: StartTracePayload) {
    const adapter = this.adapters[options.provider];
    
    if (!adapter) {
      throw new Error(`Unsupported provider: ${options.provider}`);
    }

    return new Trace(this.transport, options, adapter);
  }
}
