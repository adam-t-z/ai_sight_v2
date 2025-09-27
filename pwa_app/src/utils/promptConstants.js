/**
 * promptConstants.js
 * Centralized AI prompt definitions for the walking directions application
 * Keeping all AI prompts in one place for easy maintenance and editing
 */

export const AI_PROMPTS = {
  // Gemini AI directions prompt
  DIRECTIONS_PROMPT: (promptText) => `
    Rewrite these walking directions to be clear and easy for a blind pedestrian to follow. 
    Make it a paragraph. Make it concise. If you can shorten it, shorten it (e.g. walk 100m, walk 0.1km ==> walk 200 meters): ${promptText}
  `,

  // Gemini AI image description prompt
  IMAGE_DESCRIPTION_PROMPT: `You are helping a blind person understand what is in this image. 
    Describe the scene clearly and concisely. Mention important objects, people, actions, text, colors, expressions, and how everything is arranged. 
    Use natural, conversational language. Avoid technical jargon. Your goal is to paint a vivid mental picture using words. Make it as short as possible like 3 sentences. 
    Return only the image description`,

  // Gemini AI text explanation prompt for ImageTextReader
  TEXT_EXPLANATION_PROMPT: (cleanText) => `
    You are helping a blind person understand the content of an image by explaining the text that was found in it.

    Here is the extracted text:

    "${cleanText}"

    Please explain or summarize this text in a clear and friendly way suitable for someone who can't see it. Be brief and helpful. Do not return emojis or Asterisk.
  `,

  // Money detection prompt (if needed in future)
  MONEY_DETECTION_PROMPT: `Analyze the image to identify and count the money shown. 
    Provide a clear description of the denominations and total amount. 
    Format your response as: "X dinar bill(s): Y (total amount)"`,

  // Customizable prompts that can be edited by developers
  CUSTOM: {
    // Add custom prompts here with descriptive names
    // Example: CUSTOM_DIRECTIONS_PROMPT: (promptText) => `...`
  }
};

// Version of the prompt constants
export const PROMPT_VERSION = '1.0';