// import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
// import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { v4 as uuidv4 } from 'uuid';

// @Injectable()
// export class SupabaseService {
//   private supabase: SupabaseClient;
//   private readonly logger = new Logger(SupabaseService.name);

//   constructor() {
//     this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);
//   }

//   /**
//    * Upload an audio file to Supabase Storage
//    * @param userId - The user ID for identifying the file
//    * @param audioBuffer - The buffer containing audio data
//    * @returns The filename of the uploaded file
//    */
//   async uploadAudio(userId: number, audioBuffer: Buffer): Promise<string> {
//     try {
//       const filename = `${userId}/${uuidv4()}.wav`; // Generate a unique filename
//       const { data, error } = await this.supabase.storage
//         .from('audios') // Replace 'audios' with your Supabase storage bucket name
//         .upload(filename, audioBuffer, {
//           contentType: 'audio/wav',
//         });

//       if (error) {
//         this.logger.error(`Failed to upload audio for user ${userId}: ${error.message}`);
//         throw new ServiceUnavailableException('Audio upload failed');
//       }

//       return filename;
//     } catch (e) {
//       this.logger.error(`Error uploading audio: ${e.message}`);
//       throw new ServiceUnavailableException('Failed to upload audio');
//     }
//   }

//   /**
//    * Get a public URL for an uploaded file
//    * @param path - The path to the file in Supabase storage
//    * @param filename - The filename of the audio file
//    * @returns The public URL of the file
//    */
//   async getUrl(path: string, filename: string): Promise<string> {
//     try {
//       const { data } = this.supabase.storage.from(path).getPublicUrl(filename);

//       if (!data || !data.publicUrl) {
//         this.logger.error(`Failed to retrieve URL for ${filename}: URL is null or undefined`);
//         throw new ServiceUnavailableException('Failed to retrieve file URL');
//       }

//       return data.publicUrl;
//     } catch (e) {
//       this.logger.error(`Error retrieving file URL: ${e.message}`);
//       throw new ServiceUnavailableException('Failed to retrieve file URL');
//     }
//   }
// }
