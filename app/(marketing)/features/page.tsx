import { Upload, Zap, Search, Download, Shield, CheckCircle2 } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Key Features</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Mass transcript extraction made easy.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        icon: <Upload className="w-6 h-6" />,
                        title: "Bulk Extraction",
                        description:
                          "Extract transcripts from entire recordings at once",
                      },
                      {
                        icon: <Zap className="w-6 h-6" />,
                        title: "Multi-Platform Support",
                        description:
                          "Extract transcripts from Zoom, Microsoft Teams, and Google Meet recordings and more.",
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
                          "Download transcripts as TXT, JSON or CSV formats.",
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

export default Features;
