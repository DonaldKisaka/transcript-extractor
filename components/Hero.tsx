import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='relative overflow-hidden bg-white'>

        <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70'/>

        <div className='relative pt-24 pb-32 sm:pt-32 sm:pb-40'>
            <div className='container mx-auto px-4'>
                <div className='text-center max-w-4xl mx-auto'>
                    <h1 className='text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight'>
                        Extract{" "}
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
                            Transcripts
                        </span>{" "}
                        from Video Conferences
                    </h1>

                    <p className='text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed'>
                        Bulk extract and manage transcripts from Zoom, Microsoft Teams, and Google Meet. Upload recordings, get searchable transcripts, and download in multiple formats.
                    </p>

                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                        <Link href='/dashboard' className='inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium'>
                          Start Extracting
                          <ArrowRight className='ml-2 w-5 h-5'/>
                        </Link>   

                        <Link href='#pricing' className='inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium'>
                           Learn More
                        </Link>
                    </div>

                    <div className='mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600'>
                        <div className='flex items-center gap-2'>
                            <Check className='w-5 h-5 text-green-500'/>
                            <span>Supports Zoom, Teams & Meet</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Check className='w-5 h-5 text-green-500'/>
                            <span>Bulk Processing available</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Check className='w-5 h-5 text-green-500'/>
                            <span>Multiple export formats</span>
                        </div>
                        

                    </div>
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default Hero
