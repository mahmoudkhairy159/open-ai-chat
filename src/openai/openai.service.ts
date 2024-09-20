import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAIApi, { OpenAI } from 'openai';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';
import { File } from 'formdata-node'; // Correct import
// import { SupabaseService } from 'src/supabase/supabase.service';

// Define a type for message objects
type Message = {
  text: string;
  ai?: boolean; // Indicate if the message is from the AI
};

@Injectable()
export class OpenAIService {
    private openai: OpenAI; // Define the OpenAI instance as a private member

  constructor(/*private readonly supabaseService: SupabaseService*/) {
    // Initialize OpenAI with the provided API key from the environment
    this.openai = new OpenAI({
      apiKey:'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',
    });
  }

  /**
   * Make a request to ChatGPT to generate a response based on a prompt and message history.
   * @param prompt - The prompt for the ChatGPT model
   * @param messages - An array of messages representing the conversation history
   * @returns A string containing the generated response
   */
  async chatGptRequest(prompt: string, messages: Message[]): Promise<string> {
    try {
      const history = messages.slice(-2).map((message): ChatCompletionMessageParam => ({
        role: message.ai ? 'assistant' : 'user',
        content: message.text,
      }));
  
      const completion: ChatCompletion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: prompt,
          },
          ...history,
        ],
        temperature: 0.5,
        max_tokens: 500,
      });
  
      const [content] = completion.choices.map((choice) => choice.message.content);
      return content;
    } catch (e) {
      if (e.response?.status === 429) {
        console.error('Rate limit exceeded, please check your OpenAI plan or usage.');
        throw new ServiceUnavailableException('You have exceeded your OpenAI quota.');
      } else {
        console.error('OpenAI API Error:', e.message);
        throw new ServiceUnavailableException('Failed request to ChatGPT');
      }
    }
  }
  
  

//   async synthesizeSpeech(userId: number, text: string): Promise<string> {
//     try {
//         // Make a request to the text-to-speech model
//         const ttsResponse = await this.openai.audio.speech.create({
//             input: text,
//             model: 'tts-1-hd',
//             voice: 'alloy',
//         });

//         // Handle the response: assuming it's a ReadableStream or buffer
//         const audioBuffer = await this.handleAudioResponse(ttsResponse);

//         // Upload the audio file to Supabase or any storage service
//         const filename = await this.supabaseService.uploadAudio(userId, audioBuffer);

//         // Get the URL for the uploaded audio file
//         const audioUrl = await this.supabaseService.getUrl('/audios', filename);

//         return audioUrl;
//     } catch (e) {
//         // Log and propagate the error
//         console.error(e);
//         throw new ServiceUnavailableException('Failed to synthesize speech');
//     }
// }
// private async handleAudioResponse(response: Response): Promise<Buffer> {
//     // Check if the response is a readable stream, or access the buffer data directly
//     if (response.body) {
//         const chunks = [];
//         for await (const chunk of response.body) {
//             chunks.push(chunk);
//         }
//         return Buffer.concat(chunks);
//     }

//     // If the response already contains binary data in buffer form
//     return Buffer.from(await response.arrayBuffer());
// }
//   /**
//    * Transcribe audio from a buffer using the OpenAI Whisper model.
//    * @param audioBuffer - The buffer containing audio data
//    * @param language - The language of the audio
//    * @returns The transcribed text
//    */
//   async transcribeAudio(audioBuffer: Buffer, language: string): Promise<string> {
//     // Convert the audio buffer to a file object
//     const blob = new Blob([audioBuffer], {
//       type: 'audio/wav',
//     });
//     const file = new File([blob], 'input.wav', { type: 'audio/wav' });

//     try {
//       // Make a request to the Whisper model for audio transcription
//       const whisperResponse = await this.openai.audio.transcriptions.create({
//         model: 'whisper-1',
//         language,
//         file,
//         response_format: 'json',
//       });

//       // Return the transcribed text
//       return whisperResponse.text;
//     } catch (e) {
//       // Log and propagate the error
//       console.error(e);
//       throw new ServiceUnavailableException('Failed to transcribe audio');
//     }
//   }

//   /**
//    * Generate a response to an image-related prompt using the ChatGPT Vision model.
//    * @param text - The text prompt
//    * @param url - The URL of the image
//    * @returns A string containing the generated response
//    */
//   async chatGptVision(text: string, url: string): Promise<string> {
//     try {
//       // Make a request to the ChatGPT Vision model
//       const completion = await this.openai.chat.completions.create({
//         model: 'gpt-4-vision-preview',
//         messages: [
//           {
//             role: 'user',
//             content: [
//               { type: 'text', text },
//               { type: 'image_url', image_url: { url, detail: 'high' } },
//             ],
//           },
//         ],
//         temperature: 0.5,
//         max_tokens: 1000,
//       });

//       // Extract the content from the response
//       const [content] = completion.choices.map((choice) => choice.message.content);

//       return content;
//     } catch (e) {
//       // Log and propagate the error
//       console.error(e);
//       throw new ServiceUnavailableException('Unable to recognize image');
//     }
//   }

//   /**
//    * Generate an image based on a text prompt using the OpenAI DALL-E model.
//    * @param text - The text prompt for image generation
//    * @returns A URL pointing to the generated image
//    */
//   async generateImage(text: string): Promise<string> {
//     try {
//       // Make a request to the DALL-E model for image generation
//       const { data } = await this.openai.images.generate({
//         model: 'dall-e-3',
//         prompt: text,
//         response_format: 'url',
//       });

//       // Return the URL of the generated image
//       return data[0].url;
//     } catch (e) {
//       // Log and propagate the error
//       console.error(e);
//       throw new ServiceUnavailableException('Failed to generate image');
//     }
//   }
}