import { DollarSign, Clock, ShieldCheck, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Reduce cloud management tasks from hours to minutes with simple, conversational commands."
  },
  {
    icon: DollarSign,
    title: "Cut Costs",
    description: "Our AI identifies cost-saving opportunities and helps optimize your cloud resource allocation."
  },
  {
    icon: ShieldCheck,
    title: "Enhance Security",
    description: "Built-in safeguards and compliance checks ensure your cloud operations remain secure."
  },
  {
    icon: Zap,
    title: "Boost Productivity",
    description: "Empower your entire team to manage cloud resources without deep technical expertise."
  }
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Skyflo.ai?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <benefit.icon className="h-12 w-12 text-blue-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

