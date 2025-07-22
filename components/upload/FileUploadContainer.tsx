'use client'

import { FileUpload } from './FileUpload'
import { useFileUpload } from '@/hooks/useFileUpload'
import { Button } from '@/components/ui/button'
import { Upload, Trash2 } from 'lucide-react'

export function FileUploadContainer() {
  const {
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
  } = useFileUpload()

  const handleRemoveFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId)
    
    if (file?.status === 'success' && file.fileId) {
      deleteUploadedFile(fileId, file.fileId)
    } else {
      removeFile(fileId)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Upload Audio Files
          </h2>
          <p className="text-gray-600">
            Drag and drop your MP4, M4A, or WAV files to extract transcripts
          </p>
        </div>

        <FileUpload
          onFilesAdded={addFiles}
          onFileRemove={handleRemoveFile}
          uploadedFiles={files}
          maxFiles={10}
          disabled={isUploading}
        />

        {files.length > 0 && (
          <div className="mt-6 flex items-center justify-between border-t pt-6">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {files.length} file{files.length !== 1 ? 's' : ''} selected
                {isUploading && ` • ${uploadProgress}% complete`}
              </div>
              
              {isUploading && (
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {files.length > 0 && !isUploading && (
                <Button
                  variant="outline"
                  onClick={clearFiles}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}

              {hasPendingFiles && (
                <Button
                  onClick={uploadFiles}
                  disabled={isUploading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Files'}
                </Button>
              )}
            </div>
          </div>
        )}

        {hasUploadedFiles && !hasPendingFiles && !isUploading && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Upload className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Upload Complete!
                </h3>
                <p className="text-sm text-green-700">
                  Your files have been uploaded successfully. Processing will begin shortly.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 