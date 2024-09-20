import { Global, Module } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OpenAIController } from './openai.controller';
// import { SupabaseService } from 'src/supabase/supabase.service';

Global()
@Module({
  providers: [OpenAIService, /*SupabaseService*/],
  exports: [OpenAIService],
  controllers: [OpenAIController],

})
export class OpenAIModule {} // Correct: OpenAIModule