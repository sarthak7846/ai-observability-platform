import { ObserveConfig } from "./types";

export class Observe {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(config: ObserveConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl ?? "http://localhost:8000";
  }

  async trace() {
    const response = await fetch(`${this.baseUrl}/project/trace`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to send trace: ${response.status}`);
    }

    return response.json();
  }
}
