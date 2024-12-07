import Image from 'next/image'

const testimonials = [
  {
    quote: "CloudSpeak has revolutionized how we manage our cloud resources. It's like having a cloud expert on the team, but better!",
    author: "Sarah Johnson",
    role: "CTO, TechStart Inc."
  },
  {
    quote: "The natural language interface is a game-changer. Our team's productivity has skyrocketed since we started using CloudSpeak.",
    author: "Michael Chen",
    role: "DevOps Lead, InnovateCorp"
  },
  {
    quote: "As a non-technical founder, CloudSpeak has empowered me to manage our cloud infrastructure without constantly relying on our dev team.",
    author: "Emily Rodriguez",
    role: "Co-founder, GrowthLab"
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <p className="mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={`/placeholder.svg?height=40&width=40`}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

