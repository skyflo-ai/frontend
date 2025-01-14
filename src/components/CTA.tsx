import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 px-6 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Simplify Your Cloud Management?
        </h2>
        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Join innovative teams who are saving time, reducing costs, and
          streamlining their cloud operations with Skyflo.ai. Experience the
          future of cloud management today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-900">
            Start Your Free Trial
          </Button>
          <Button size="lg" variant="outline" className="group">
            Schedule a Demo
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
