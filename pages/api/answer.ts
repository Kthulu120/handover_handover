import OpenAI from "openai";

export const config = {
  runtime: "edge"
};
const client = new OpenAI({ apiKey: "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"});

const handler = async (req: Request): Promise<Response> => {
  try {
    const feed = await req.json()

  console.log("Prompt:", feed); 
    const response = await client.responses.create({
    model: "gpt-5",
    instructions: `Provide a 2-3 sentence answer to the query based on the following sources. Be original, concise, accurate, and helpful. Cite sources as [1] or [2] or [3] after each sentence (not just the very end) to back up your answer (Ex: Correct: [1], Correct: [2][3], Incorrect: [1, 2]). Include citations at the end as a list of links using <> to denote the list.`,
    input: feed.prompt
  });


    return new Response(response.output_text);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
