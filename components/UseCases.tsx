import { Upload, Zap, Search, Download, Shield, CheckCircle2 } from "lucide-react";

const UseCases = () => {
  return (
    <section id="use-cases" className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Use Cases</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Perfect for professionals who need to extract and manage transcripts from video conferences
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        icon: <Upload className="w-6 h-6" />,
                        title: "Bulk Upload Support",
                        description:
                          "Upload multiple files at once with drag & drop functionality for efficient batch processing",
                      },
                      {
                        icon: <Zap className="w-6 h-6" />,
                        title: "Multi-Platform Support",
                        description:
                          "Extract transcripts from Zoom, Microsoft Teams, and Google Meet recordings",
                      },
                      {
                        icon: <Search className="w-6 h-6" />,
                        title: "Advanced Search",
                        description:
                          "Search across all transcripts with keyword highlighting and context preview",
                      },
                      {
                        icon: <Download className="w-6 h-6" />,
                        title: "Multiple Export Formats",
                        description:
                          "Download transcripts as TXT, SRT subtitle files, or structured JSON data",
                      },
                      {
                        icon: <Shield className="w-6 h-6" />,
                        title: "Secure Processing",
                        description:
                          "Your data is processed securely with user authentication and private storage",
                      },
                      {
                        icon: <CheckCircle2 className="w-6 h-6" />,
                        title: "Progress Tracking",
                        description:
                          "Real-time progress indicators show the status of your transcript extraction",
                      },
                ].map((feature, index) => (
                    <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div className="text-blue-600 mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>

                    </div>
                ))}

            </div>
        </div>

    </section>
  )
}

export default UseCases;
