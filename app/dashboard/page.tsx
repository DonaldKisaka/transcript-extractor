import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { FileUploadContainer } from '@/components/upload/FileUploadContainer'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* File Upload Section */}
          <div>
            <FileUploadContainer />
          </div>

          {/* Files List Section - TODO: Add in next phase */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Your Files
            </h2>
            <div className="text-center py-12 text-gray-500">
              <p>Your uploaded files and transcripts will appear here.</p>
              <p className="text-sm mt-2">Upload some files to get started!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
