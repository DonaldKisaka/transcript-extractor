'use client'

import { useState, useCallback } from 'react'
import { uploadFile, deleteFile, FileUploadResponse } from '@/app/actions/files'
import toast from 'react-hot-toast'

interface FileWithPreview extends File {
  id: string
  preview?: string
  progress?: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
  fileId?: string 
}

export const useFileUpload = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const addFiles = useCallback((newFiles: FileWithPreview[]) => {
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const removeFile = useCallback((fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }, [])

  const updateFileProgress = useCallback((fileId: string, progress: number, status?: FileWithPreview['status']) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? { ...file, progress, ...(status && { status }) }
          : file
      )
    )
  }, [])

  const updateFileStatus = useCallback((fileId: string, status: FileWithPreview['status'], error?: string, dbFileId?: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? { ...file, status, error, ...(dbFileId && { fileId: dbFileId }) }
          : file
      )
    )
  }, [])

  const uploadFiles = useCallback(async () => {
    const pendingFiles = files.filter((file) => file.status === 'pending')
    
    if (pendingFiles.length === 0) {
      toast.error('No files to upload')
      return
    }

    setIsUploading(true)

    try {
      for (const file of pendingFiles) {
        updateFileStatus(file.id, 'uploading')
        updateFileProgress(file.id, 0, 'uploading')

        try {
          const progressInterval = setInterval(() => {
            updateFileProgress(file.id, Math.min(90, Math.random() * 80 + 10))
          }, 500)

          const result: FileUploadResponse = await uploadFile(file, file.name)

          clearInterval(progressInterval)

          if (result.success) {
            updateFileProgress(file.id, 100, 'success')
            updateFileStatus(file.id, 'success', undefined, result.fileId)
            toast.success(`${file.name} uploaded successfully!`)
          } else {
            updateFileStatus(file.id, 'error', result.error || result.message)
            toast.error(`Failed to upload ${file.name}: ${result.message}`)
          }
        } catch (error) {
          updateFileStatus(file.id, 'error', 'Upload failed')
          toast.error(`Failed to upload ${file.name}`)
          console.error('Upload error:', error)
        }
      }
    } finally {
      setIsUploading(false)
    }
  }, [files, updateFileStatus, updateFileProgress])

  const deleteUploadedFile = useCallback(async (fileId: string, dbFileId: string) => {
    try {
      const result = await deleteFile(dbFileId)
      
      if (result.success) {
        removeFile(fileId)
        toast.success('File deleted successfully')
      } else {
        toast.error(`Failed to delete file: ${result.message}`)
      }
    } catch (error) {
      toast.error('Failed to delete file')
      console.error('Delete error:', error)
    }
  }, [removeFile])

  const clearFiles = useCallback(() => {
    setFiles([])
  }, [])

  const hasUploadedFiles = files.some((file) => file.status === 'success')
  const hasPendingFiles = files.some((file) => file.status === 'pending')
  const uploadProgress = files.length > 0 
    ? Math.round(files.reduce((acc, file) => acc + (file.progress || 0), 0) / files.length)
    : 0

  return {
    files,
    isUploading,
    hasUploadedFiles,
    hasPendingFiles,
    uploadProgress,
    addFiles,
    removeFile,
    uploadFiles,
    deleteUploadedFile,
    clearFiles,
  }
} 