import { Observe } from "@observe/sdk";

const observe = new Observe({
  apiKey:
    "obs_live_818ca4ac9034a931de0c1cc018c33589cec81e404a41a962c804b4ce513d992e",
  baseUrl: "http://localhost:8000",
});

const result = await observe.trace();

console.log("result", result);
