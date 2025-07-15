import { Upload, Download, FileText } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="howitworks" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Extract transcripts from your video conferences in just a few simple steps.
                </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                   {
                    icon: <Upload className="w-6 h-6 text-blue-500" />,
                    title: "1. Upload Recordings",
                    description:
                      "Drag & drop your video files from any platform",
                  },
                  {
                    icon: <FileText className="w-6 h-6 text-blue-500" />,
                    title: "2. Extract Transcripts",
                    description:
                      "Wait for the Recording to be processed and transcript to be extracted",
                  },
                  
                  {
                    icon: <Download className="w-6 h-6 text-blue-500" />,
                    title: "3. Download",
                    description: "Download transcripts in your preferred format (TXT, JSON, CSV)",
                  },
                ].map((feature, index) => (
                    <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div className="text-blue-600 mb-4 animate-bounce">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}

            </div>
           
        </div>

    </section>
  )
}

export default HowItWorks;
