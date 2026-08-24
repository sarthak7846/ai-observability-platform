import { Observe, TraceStatus } from "@observe/sdk";
import OpenAI from "openai";
import 'dotenv/config';


console.log(process.env.OPENAI_API_KEY)

const observe = new Observe({
  apiKey:
    "obs_live_818ca4ac9034a931de0c1cc018c33589cec81e404a41a962c804b4ce513d992e",
  baseUrl: "http://localhost:8000",
});

const client = new OpenAI();

const trace = observe.startTrace({
  model: "gpt-5",
  provider: "openai",
});

const response = await trace.capture(async () => {
  return client.responses.create({
    model: "gpt-5.6",
    input: "Write a one-sentence bedtime story about a unicorn.",
  });
});

// const response = await trace.capture(async () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         inputTokens: 120,
//         outputTokens: 350,
//         totalTokens: 470,
//       });
//     }, 2000);
//   });
// });

console.log("result", response);

// setTimeout(async () => {
//   await trace.end({
//     status: TraceStatus.SUCCESS,
//     inputTokens: 120,
//     outputTokens: 350,
//     totalTokens: 470,
//   });
// }, 2000);

// try {
//   const response = await openai.chat.completions.create(...);

//   await trace.end({
//     status: TraceStatus.SUCCESS,
//   });

//   return response;
// } catch (error) {
//   await trace.end({
//     status: TraceStatus.ERROR,
//     errorType: error.constructor.name,
//     errorMessage: error.message,
//   });

//   throw error;
// }
