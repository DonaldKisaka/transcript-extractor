import Link from "next/link";
import { Linkedin, Github } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <>
    <footer className='bg-gray-50 border-t border-gray-100'>
        <div className='container mx-auto px-8 py-12'>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mb-12'>
                <div>
                    <h3 className='font-semibold text-gray-900 mb-4'>Product</h3>
                    <ul className='space-y-2'>
                        <li>
                            <Link href='#features' className="text-gray-600 hover:text-blue-600">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href='#howitworks' className="text-gray-600 hover:text-blue-600">
                                How It Works
                            </Link>
                        </li>
                        
                        <li>
                            <Link href='/dashboard' className="text-gray-600 hover:text-blue-600">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className='font-semibold text-gray-900 mb-4'>Resources</h3>
                    <ul className='space-y-2'>
                        <li>
                            <Link href='/' className="text-gray-600 hover:text-blue-600">
                                Documentation
                            </Link>
                        </li>
                        <li>
                            <Link href='/' className="text-gray-600 hover:text-blue-600">
                                Blog
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className='font-semibold text-gray-900 mb-4'>Legal</h3>
                    <ul className='space-y-2'>
                        <li>
                            <Link href='/' className="text-gray-600 hover:text-blue-600">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href='/' className="text-gray-600 hover:text-blue-600">
                                Terms of Service
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
                <div className="text-gray-600 mb-4 md:mb-0">
                    &copy; {currentYear} TranscriptExtractor. All rights reserved.
                </div>

                <div className="flex space-x-6">
                    <a href="https://www.linkedin.com/in/donald-kisaka-a8b90b26b/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="https://github.com/donaldkisaka" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">GitHub</span>
                        <Github className="w-6 h-6" />
                    </a>   

                </div>


            </div>
        </div>

    </footer>
      
    </>
  )
}

export default Footer;
