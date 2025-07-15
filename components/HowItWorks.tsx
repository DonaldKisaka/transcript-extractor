import { Upload, Search, Download, FileText } from "lucide-react";

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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                   {
                    icon: <Upload className="w-6 h-6 text-blue-500" />,
                    title: "Upload Recordings",
                    description:
                      "Drag & drop your video files from Zoom, Teams, or Meet",
                  },
                  {
                    icon: <FileText className="w-6 h-6 text-blue-500" />,
                    title: "Extract Transcripts",
                    description:
                      "Automated processing with platform-specific extraction",
                  },
                  {
                    icon: <Search className="w-6 h-6 text-blue-500" />,
                    title: "Search & Manage",
                    description:
                      "Find specific content across all your transcripts",
                  },
                  {
                    icon: <Download className="w-6 h-6 text-blue-500" />,
                    title: "Export Formats",
                    description: "Download as TXT, SRT, or JSON files",
                  },
                ].map((feature, index) => (
                    <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div>{feature.icon}</div>
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
