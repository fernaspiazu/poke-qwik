import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getFunFactAboutPokemon = async (pokemonName: string): Promise<string> => {
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Give information about pokemon ${pokemonName}`,
    temperature: 1,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].text || `I don't know anything about ${pokemonName} :(`;
}