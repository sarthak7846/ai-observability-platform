import { Trace } from "./trace";
import { Transport } from "./transport";
import { ObserveConfig, StartTracePayload } from "./types";

export class Observe {
  private readonly transport: Transport;

  constructor(config: ObserveConfig) {
    this.transport = new Transport(
      config.apiKey,
      config.baseUrl ?? "http://localhost:8000",
    );
  }

  startTrace(options: StartTracePayload) {
    return new Trace(this.transport, options);
  }
}
