import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Cpu, Network, Calculator, Users, PiSquare } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-yellow-200">
        <Link className="flex items-center justify-center" href="#">
          <PiSquare className="h-6 w-6 text-yellow-600" />
          <span className="ml-2 text-lg font-bold text-black">DianneLab</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-700" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-700" href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-700" href="#use-cases">
            Use Cases
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-gray-700" href="#other-products">
            Other Products
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-yellow-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-black">
                  DianneLab: AI Agent Infrastructure
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                  Explore our cutting-edge AI agent platform. Create, customize, and deploy intelligent agent systems on the Solana blockchain. One of many innovative products from DianneLab.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className="bg-yellow-600 text-white hover:bg-yellow-700">
                  <Link href="/create-agent">Create Your Agent System</Link>
                </Button>
                <Button variant="outline" asChild className="border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                  <Link href="#learn-more">Explore DianneLab</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-black">AI Agent Platform Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="border-yellow-200">
                <CardHeader>
                  <Cpu className="h-10 w-10 mb-2 text-yellow-600" />
                  <CardTitle className="text-black">Multi-Agent Systems</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Design and deploy complex agent systems with multiple specialized agents working together towards common goals.</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200">
                <CardHeader>
                  <Network className="h-10 w-10 mb-2 text-yellow-600" />
                  <CardTitle className="text-black">Flexible Hierarchies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Choose between flat or managed hierarchies for your agent systems, tailoring the structure to your specific needs.</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200">
                <CardHeader>
                  <Calculator className="h-10 w-10 mb-2 text-yellow-600" />
                  <CardTitle className="text-black">API Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Seamlessly integrate various APIs including OpenAI, Twitter, Instagram, Phantom Wallet, and Solana JSON-RPC to enhance your agents' capabilities.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-yellow-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-black">How It Works</h2>
            <ol className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-600 text-white">1</div>
                <h3 className="mt-4 text-xl font-semibold text-black">Design Your System</h3>
                <p className="mt-2 text-gray-700">Choose between single or multi-agent systems and define your agent hierarchy.</p>
              </li>
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-600 text-white">2</div>
                <h3 className="mt-4 text-xl font-semibold text-black">Set Goals & Tools</h3>
                <p className="mt-2 text-gray-700">Define specific goals for each agent and select the API tools they'll use to achieve them.</p>
              </li>
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-600 text-white">3</div>
                <h3 className="mt-4 text-xl font-semibold text-black">Deploy & Monitor</h3>
                <p className="mt-2 text-gray-700">Launch your agent system on the Solana blockchain and monitor its performance in real-time.</p>
              </li>
            </ol>
          </div>
        </section>
        <section id="use-cases" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-black">Use Cases</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-black">Automated Content Creation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Deploy a multi-agent system that researches topics, generates content, and manages social media posting, all working in harmony to maintain your online presence.</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-black">Decentralized Data Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Create a network of agents that collect, process, and analyze data from various sources, providing real-time insights for your decentralized applications.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="other-products" className="w-full py-12 md:py-24 lg:py-32 bg-yellow-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-black">Explore DianneLab</h2>
            <p className="text-center mb-8 text-gray-700">
              Our AI agent platform is just one of many innovative products at DianneLab. Discover our full range of cutting-edge AI solutions.
            </p>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-black">AI Research Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Advanced AI-powered tools for academic and scientific research, accelerating discoveries across various fields.</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-black">Quantum AI Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Pioneering solutions that combine quantum computing principles with AI for unprecedented problem-solving capabilities.</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-black">Ethical AI Framework</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">A comprehensive framework for developing and deploying AI systems with strong ethical considerations and safeguards.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-gray-700 md:text-xl">
                  Create your first agent system now and experience the power of DianneLab's decentralized AI infrastructure.
                </p>
              </div>
              <Button asChild className="mt-4 bg-yellow-600 text-white hover:bg-yellow-700">
                <Link href="/create-agent">Create Your Agent System</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-yellow-200">
        <p className="text-xs text-black">© 2024 DianneLab. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-black" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-black" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

