import Link from "next/link"
import { ArrowRight, Heart, Shield, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white">
              ElderCare<span className="text-purple-400"></span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
              <Link href="/about" className="text-white">
                About
              </Link>
              <Link href="/features" className="text-gray-400 hover:text-white">
                Features
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
              <Button asChild className="bg-purple-700 hover:bg-purple-600 text-white">
                <Link href="/dashboard">Try Demo</Link>
              </Button>
            </nav>
            <Button variant="ghost" className="md:hidden text-gray-400 hover:text-white">
              <span className="sr-only">Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About ElderCareAI</h1>
              <p className="text-xl text-gray-300 mb-8">
                Our mission is to enhance the quality of life for elderly individuals through innovative AI technology.
              </p>
            </div>
          </div>
        </section>

        {/* Challenge Overview Section */}
        <section className="py-16 bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Challenge Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  As the global population ages, ensuring the well-being of elderly individuals living independently
                  presents a major challenge. The goal of this hackathon is to develop a multi-agentic AI system that
                  assists elderly individuals by providing real-time monitoring, reminders, and safety alerts, while
                  promoting health management and social engagement.
                </p>
                <p className="text-gray-300">
                  The agents work together to create a collaborative support system, involving caregivers, healthcare
                  providers, and family members to ensure optimal care and peace of mind. The system monitors health,
                  detects unusual behavior, and provides alerts in case of emergencies. It also provides reminders to
                  manage daily routines, such as medication schedules, appointments, and daily activities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Process Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Current Process</h2>
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <Heart className="h-6 w-6 text-red-500 mt-1" />
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">Healthcare Provider</h3>
                      <p className="text-gray-300">
                        Monitors health data (e.g., heart rate, blood pressure, glucose levels) through wearable devices
                        and gets alerted if abnormal values are detected.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <Shield className="h-6 w-6 text-emerald-500 mt-1" />
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">Safety Monitoring System</h3>
                      <p className="text-gray-300">
                        Uses sensors or wearables to track movement, activity, and falls. If an elderly person falls or
                        exhibits unusual behavior (e.g., remaining stationary for too long), the system triggers an
                        alert.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <Calendar className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">Daily Activity Reminder System</h3>
                      <p className="text-gray-300">
                        Sends reminders in form of voice notes to the elderly individual for medication intake,
                        scheduled appointments or daily activities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="py-16 bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Technology Stack</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <p className="text-gray-300">Ollama based on-prem LLMs</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <p className="text-gray-300">Custom tools for agents– API, web scrapper, ML model etc.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <p className="text-gray-300">Ollama based embedding models</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <p className="text-gray-300">SQLite DB</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <p className="text-gray-300">Multi agent framework</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-medium text-white mb-4">Technical Implementation</h3>
                <p className="text-gray-300 mb-6">
                  Our solution implements a multi-agent framework where each agent specializes in a specific aspect of
                  elderly care. The agents communicate through a central orchestration layer, ensuring seamless
                  collaboration and data sharing.
                </p>
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-lg font-medium text-white mb-3">Key Technical Features:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-400">•</span>
                      <span>On-premise LLMs for privacy and reduced latency</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-400">•</span>
                      <span>Lightweight SQLite database for reliable data storage</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-400">•</span>
                      <span>Custom agent tools for specialized tasks</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-400">•</span>
                      <span>Embedding models for efficient information retrieval</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-400">•</span>
                      <span>Orchestration layer for agent coordination</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-900 to-blue-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience ElderCare AI?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Try our interactive dashboard demo and see how our multi-agent system can transform elderly care.
            </p>
            <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
              <Link href="/dashboard">
                Try Dashboard Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                ElderCare<span className="text-purple-400">AI</span>
              </h3>
              <p className="text-gray-400">Enhancing elderly care through intelligent multi-agent AI systems.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="text-gray-400 hover:text-white">
                    Request Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-gray-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-400 hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} ElderCareAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

