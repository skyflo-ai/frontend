import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Simplify Cloud Management with Conversational AI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Say goodbye to complex dashboards. Manage your cloud infrastructure as easily as chatting with a colleague.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="group">
              See It in Action
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="AI-powered cloud management illustration"
            width={400}
            height={400}
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  )
}

