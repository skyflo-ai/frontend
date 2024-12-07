import { MessageSquare, Zap, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: MessageSquare,
    title: "Chat with Skyflo",
    description: "Simply type your request in plain English, like 'Show me all running EC2 instances' or 'Scale up the database cluster'."
  },
  {
    icon: Zap,
    title: "Instant Action",
    description: "Skyflo.ai immediately understands your intent and executes the appropriate cloud operations, no technical knowledge required."
  },
  {
    icon: Sparkles,
    title: "Smart Suggestions",
    description: "Our AI learns from your usage patterns and provides proactive suggestions to optimize your cloud infrastructure and reduce costs."
  }
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="how-it-works" className="py-24 px-6 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">How Skyflo.ai Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                activeStep === index ? 'border-2 border-blue-500' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveStep(index)}
            >
              <step.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 bg-gray-700 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">{steps[activeStep].title}</h3>
          <p className="text-gray-300">{steps[activeStep].description}</p>
        </div>
      </div>
    </section>
  )
}

