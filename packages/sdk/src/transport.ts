import { CreateTracePayload } from "./types";

export class Transport {
  constructor(
    private readonly apiKey: string,
    private readonly baseUrl: string,
  ) {}

  async sendTrace(payload: CreateTracePayload) {
    const response = await fetch(`${this.baseUrl}/project/trace`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  }
}
