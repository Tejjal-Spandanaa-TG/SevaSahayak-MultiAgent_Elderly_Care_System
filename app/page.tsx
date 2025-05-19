import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Heart, Shield, Calendar, Users, MessageSquare, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardPreview from "@/components/dashboard-preview"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 z-0" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">SevaSahayak</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              A multi-agent system that enhances elderly care through real-time monitoring, safety alerts, and caregiver
              collaboration, powered by on-premise Ollama LLMs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-purple-700 hover:bg-purple-600 text-white">
                <Link href="/signin">
                  Sign In <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Multi-Agent System</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our system uses specialized agents powered by Ollama LLMs that work together to provide comprehensive care
              and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle className="text-white">Health Monitoring</CardTitle>
                <CardDescription className="text-gray-400">
                  Tracks vital signs and detects anomalies through wearable integration
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Real-time monitoring of heart rate, blood pressure, and other vital signs with personalized baselines
                  and anomaly detection using custom ML models.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Shield className="h-12 w-12 text-emerald-500 mb-4" />
                <CardTitle className="text-white">Safety & Activity</CardTitle>
                <CardDescription className="text-gray-400">Detects falls and unusual behavior patterns</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Advanced sensors monitor movement and activity, detecting falls or extended periods of inactivity to
                  trigger appropriate alerts through our agent system.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Calendar className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-white">Reminders & Schedule</CardTitle>
                <CardDescription className="text-gray-400">Manages medications and appointments</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Adaptive notification system for medication, appointments, and daily activities with adherence
                  tracking and feedback, stored securely in our SQLite database.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-violet-500 mb-4" />
                <CardTitle className="text-white">Caregiver Coordination</CardTitle>
                <CardDescription className="text-gray-400">
                  Facilitates communication between care team members
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Secure messaging platform for family members, healthcare providers, and emergency services with care
                  plan sharing, powered by our on-premise LLM system.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Users className="h-12 w-12 text-amber-500 mb-4" />
                <CardTitle className="text-white">Social Engagement</CardTitle>
                <CardDescription className="text-gray-400">Promotes social interaction and activities</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Personalized activity recommendations and video call scheduling to maintain social connections and
                  mental wellbeing, using Ollama embedding models for personalization.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Brain className="h-12 w-12 text-cyan-500 mb-4" />
                <CardTitle className="text-white">Central Orchestration</CardTitle>
                <CardDescription className="text-gray-400">
                  Coordinates all agents and manages data flow
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Intelligent system that ensures all agents work together seamlessly, prioritizing tasks and managing
                  data securely through our multi-agent framework.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Intuitive Dashboard</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our comprehensive dashboard provides caregivers with real-time insights and control.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
            <Suspense
              fallback={<div className="h-[500px] flex items-center justify-center">Loading dashboard preview...</div>}
            >
              <DashboardPreview />
            </Suspense>
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-purple-700 hover:bg-purple-600 text-white">
              <Link href="/signin">Sign In to Access Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Technology Stack</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built with cutting-edge AI and privacy-focused technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">On-Premise LLMs</h3>
              <p className="text-gray-300">
                Ollama-based large language models running locally for enhanced privacy and reduced latency.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Custom Agent Tools</h3>
              <p className="text-gray-300">
                Specialized tools including APIs, web scrapers, and ML models to enhance agent capabilities.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Embedding Models</h3>
              <p className="text-gray-300">
                Ollama-based embedding models for efficient information retrieval and context understanding.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">SQLite Database</h3>
              <p className="text-gray-300">
                Lightweight, serverless database for reliable data storage with minimal configuration.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Multi-Agent Framework</h3>
              <p className="text-gray-300">
                Custom framework for agent orchestration, communication, and collaborative problem-solving.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Privacy-First Design</h3>
              <p className="text-gray-300">
                End-to-end encryption and local processing to ensure sensitive health data remains secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience SevaSahayak?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join our early access program and be among the first to implement this revolutionary care system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
              <Link href="/signup">Sign Up for Early Access</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">SevaSahayak</h3>
              <p className="text-gray-400">Enhancing elderly care through intelligent multi-agent systems.</p>
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
            <p>© {new Date().getFullYear()} SevaSahayak. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

