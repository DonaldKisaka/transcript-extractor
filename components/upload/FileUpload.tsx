'use client'

import { useCallback, useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { Upload, X, FileAudio, File, CheckCircle } from 'lucide-react'

interface FileWithPreview extends File {
  id: string
  preview?: string
  progress?: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

interface FileUploadProps {
  onFilesAdded: (files: FileWithPreview[]) => void
  onFileRemove: (fileId: string) => void
  uploadedFiles: FileWithPreview[]
  maxFiles?: number
  disabled?: boolean
}

const ACCEPTED_FILE_TYPES = {
  'audio/mp4': ['.mp4', '.m4a'],
  'audio/wav': ['.wav'],
  'video/mp4': ['.mp4'],
  'audio/mpeg': ['.mp3'], 
}

const MAX_FILE_SIZE = 500 * 1024 * 1024 

export function FileUpload({ 
  onFilesAdded, 
  onFileRemove, 
  uploadedFiles, 
  maxFiles = 10,
  disabled = false 
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      console.error('Rejected files:', rejectedFiles)
    }

    const filesWithPreview: FileWithPreview[] = acceptedFiles.map((file, index) => ({
      ...file,
      id: `${Date.now()}-${index}`,
      status: 'pending' as const,
      progress: 0,
    }))

    onFilesAdded(filesWithPreview)
  }, [onFilesAdded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    maxFiles: maxFiles,
    disabled: disabled || uploadedFiles.length >= maxFiles,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (file: FileWithPreview) => {
    if (file.type.startsWith('audio/') || file.name.endsWith('.m4a')) {
      return <FileAudio className="w-5 h-5 text-blue-600" />
    }
    return <File className="w-5 h-5 text-gray-500" />
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer 
          transition-all duration-200 ease-in-out
          ${isDragActive || dragActive
            ? 'border-blue-400 bg-blue-50/50 scale-[1.02]' 
            : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50/50'
          }
          ${disabled || uploadedFiles.length >= maxFiles
            ? 'cursor-not-allowed opacity-60 pointer-events-none'
            : ''
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200
            ${isDragActive || dragActive ? 'bg-blue-100' : 'bg-gray-100'}
          `}>
            <Upload className={`w-8 h-8 transition-colors duration-200 ${
              isDragActive || dragActive ? 'text-blue-600' : 'text-gray-500'
            }`} />
          </div>
          
          {isDragActive ? (
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Drop files here
              </h3>
              <p className="text-blue-600">
                Release to upload your audio files
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">
                Drag & drop audio files
              </h3>
              <p className="text-gray-600 max-w-md">
                or <button type="button" className="text-blue-600 hover:text-blue-700 font-medium underline">browse files</button> to upload
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                <span className="bg-gray-100 px-3 py-1 rounded-full">MP4</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">M4A</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">WAV</span>
              </div>
              <p className="text-xs text-gray-500">
                Max file size: {formatFileSize(MAX_FILE_SIZE)} • Max {maxFiles} files
              </p>
            </div>
          )}
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-8 space-y-3">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getFileIcon(file)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900 truncate pr-2">
                      {file.name}
                    </p>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatFileSize(file.size)}
                      </span>
                      {file.status === 'success' && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <button
                        onClick={() => onFileRemove(file.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        disabled={file.status === 'uploading'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {file.status === 'uploading' && (
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress || 0}%` }}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${
                        file.status === 'success' ? 'text-green-600' :
                        file.status === 'error' ? 'text-red-600' :
                        file.status === 'uploading' ? 'text-blue-600' :
                        'text-gray-500'
                      }`}>
                        {file.status === 'pending' && 'Ready to upload'}
                        {file.status === 'uploading' && `Uploading... ${file.progress || 0}%`}
                        {file.status === 'success' && 'Upload complete'}
                        {file.status === 'error' && `Error: ${file.error || 'Upload failed'}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 