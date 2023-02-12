import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, resp) => {
  resp.status(200).send("Message: This is ChatGPT Ai App");
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, resp) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.input,
      temperature: 0,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      stop: ["\"\"\""],
    });

    console.log("PASSED:", req.body.input);

    resp.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (err) {
    console.log("FAILED: ", req.body.input);
    console.error(err);
    resp.status(500).send(err);
  }
});

app.listen(4000, () => console.log("server is running on port 4000"));
