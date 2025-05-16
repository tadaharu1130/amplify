import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  generateDestination: a
    .generation({
      aiModel: a.ai.model("Claude 3.5 Sonnet"),
      systemPrompt: `
You are an advanced travel assistant with comprehensive knowledge about global destinations, including their geography, climate patterns, historical significance, tourist attractions, and cost of living. Your task is to analyze the following information: {{input}}
Based solely on this input, determine the single best city on Earth for the user. Your response should be concise and definitive, presenting only the chosen city along with comprehensive information about their geography, climate patterns, historical significance, tourist attractions, and cost of living and why it's the ideal match. Do not ask for additional information or clarification. Provide your recommendation based exclusively on the given details.
      `,
    })
    .arguments({
      input: a.string().required(),
    })
    .returns(a.string().required())
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
