'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const FileUploadSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  fileSize: z.number().positive('File size must be positive'),
  fileType: z.enum(['mp4', 'm4a', 'wav'], { message: 'Invalid file type' }),
})

export type FileUploadResponse = {
  success: boolean
  message: string
  fileId?: string
  error?: string
}

export const uploadFile = async (
  file: File,
  filename: string
): Promise<FileUploadResponse> => {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return {
        success: false,
        message: 'Authentication required',
        error: 'User not authenticated',
      }
    }

    const fileExtension = filename.split('.').pop()?.toLowerCase()
    const fileType = fileExtension === 'm4a' ? 'm4a' : fileExtension

    const validationResult = FileUploadSchema.safeParse({
      filename,
      fileSize: file.size,
      fileType,
    })

    if (!validationResult.success) {
      return {
        success: false,
        message: 'File validation failed',
        error: validationResult.error.flatten().fieldErrors.fileType?.[0] || 'Validation error',
      }
    }

    const timestamp = Date.now()
    const storagePath = `${user.id}/${timestamp}-${filename}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('audio-files')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return {
        success: false,
        message: 'Failed to upload file',
        error: uploadError.message,
      }
    }

    const { data: fileData, error: dbError } = await supabase
      .from('files')
      .insert({
        user_id: user.id,
        filename: filename,
        file_size: file.size,
        file_type: fileType,
        storage_path: uploadData.path,
        upload_status: 'uploaded',
      })
      .select('id')
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      
      await supabase.storage
        .from('audio-files')
        .remove([uploadData.path])

      return {
        success: false,
        message: 'Failed to save file information',
        error: dbError.message,
      }
    }

    return {
      success: true,
      message: 'File uploaded successfully',
      fileId: fileData.id,
    }
  } catch (error) {
    console.error('Upload action error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const deleteFile = async (fileId: string): Promise<FileUploadResponse> => {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return {
        success: false,
        message: 'Authentication required',
        error: 'User not authenticated',
      }
    }

    const { data: fileData, error: fileError } = await supabase
      .from('files')
      .select('storage_path')
      .eq('id', fileId)
      .eq('user_id', user.id)
      .single()

    if (fileError || !fileData) {
      return {
        success: false,
        message: 'File not found',
        error: 'File not found or access denied',
      }
    }

    const { error: storageError } = await supabase.storage
      .from('audio-files')
      .remove([fileData.storage_path])

    if (storageError) {
      console.error('Storage deletion error:', storageError)
    }

    const { error: dbError } = await supabase
      .from('files')
      .delete()
      .eq('id', fileId)
      .eq('user_id', user.id)

    if (dbError) {
      console.error('Database deletion error:', dbError)
      return {
        success: false,
        message: 'Failed to delete file record',
        error: dbError.message,
      }
    }

    return {
      success: true,
      message: 'File deleted successfully',
    }
  } catch (error) {
    console.error('Delete action error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getUserFiles = async () => {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return {
        success: false,
        message: 'Authentication required',
        files: [],
      }
    }

    const { data: files, error: filesError } = await supabase
      .from('files')
      .select(`
        id,
        filename,
        file_size,
        file_type,
        upload_status,
        created_at,
        processing_jobs(
          id,
          status,
          progress_percentage,
          error_message
        ),
        transcripts(
          id,
          word_count
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (filesError) {
      console.error('Files query error:', filesError)
      return {
        success: false,
        message: 'Failed to load files',
        files: [],
      }
    }

    return {
      success: true,
      message: 'Files loaded successfully',
      files: files || [],
    }
  } catch (error) {
    console.error('Get files error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred',
      files: [],
    }
  }
} 