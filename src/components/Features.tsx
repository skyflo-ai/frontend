import { Cloud, Zap, Lock, Users } from 'lucide-react'

const features = [
  {
    icon: Cloud,
    title: 'Intuitive Commands',
    description: 'Manage your cloud resources using natural language. No technical jargon required.'
  },
  {
    icon: Zap,
    title: 'AI-Powered Efficiency',
    description: 'Our AI understands context and suggests optimal configurations for your needs.'
  },
  {
    icon: Lock,
    title: 'Enhanced Security',
    description: 'Built-in safeguards and compliance checks to keep your cloud resources secure.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Easily share and manage permissions across your organization.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Powerful Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

