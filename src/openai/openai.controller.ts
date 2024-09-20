import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  /**
   * Endpoint to generate a chat response using GPT-4
   * @param prompt - The initial prompt for the GPT model
   * @param messages - An array of message history
   * @returns The AI-generated response
   */
  @Post('chat')
  async generateChatResponse(
    @Body('prompt') prompt: string,
    @Body('messages') messages: { text: string, ai?: boolean }[],
  ): Promise<{ response: string }> {
    try {
      const response = await this.openAIService.chatGptRequest(prompt, messages);
      return { response };
    } catch (e) {
      throw new HttpException('Error generating chat response', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  // You can add more endpoints for other OpenAI service functionalities, such as image generation, speech synthesis, etc.

  // Example for image generation using DALL-E:
//   @Post('image')
//   async generateImage(@Body('prompt') prompt: string): Promise<{ imageUrl: string }> {
//     try {
//       const imageUrl = await this.openAIService.generateImage(prompt);
//       return { imageUrl };
//     } catch (e) {
//       throw new HttpException('Error generating image', HttpStatus.SERVICE_UNAVAILABLE);
//     }
//   }
}
