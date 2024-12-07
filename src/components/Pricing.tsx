import { Check, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { usePricing, plans } from '../hooks/usePricing'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function Pricing() {
  const { isAnnual, selectedPlan, toggleBillingCycle, setSelectedPlan } = usePricing()

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Choose Your Plan</h2>
        <div className="flex justify-center items-center mb-8">
          <span className={`mr-2 ${isAnnual ? 'text-gray-400' : 'text-white'}`}>Monthly</span>
          <Switch checked={isAnnual} onCheckedChange={toggleBillingCycle} />
          <span className={`ml-2 ${isAnnual ? 'text-white' : 'text-gray-400'}`}>Annual</span>
          <span className="ml-2 text-sm text-blue-400">(Save 20%)</span>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow ${
                selectedPlan === plan.name ? 'border-2 border-blue-500' : ''
              }`}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              {plan.price ? (
                <p className="text-4xl font-bold mb-6">{plan.price}</p>
              ) : (
                <p className="text-4xl font-bold mb-6">
                  ${isAnnual ? plan.annualPrice / 12 : plan.monthlyPrice}
                  <span className="text-xl font-normal">/month</span>
                </p>
              )}
              {isAnnual && plan.annualPrice && (
                <p className="text-sm text-blue-400 mb-6">Billed annually at ${plan.annualPrice}/year</p>
              )}
              <ul className="mb-8 space-y-2">
                {plan.features.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature.name}: {feature.value}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={selectedPlan === plan.name ? 'default' : 'outline'}
                onClick={() => setSelectedPlan(plan.name)}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
              </Button>
            </div>
          ))}
        </div>
        <div className="bg-gray-800 p-8 rounded-lg overflow-x-auto">
          <h3 className="text-2xl font-semibold mb-4">Plan Comparison</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left pb-4">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="text-center pb-4">{plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans[0].features.map((feature, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="py-4">{feature.name}</td>
                  {plans.map((plan) => (
                    <td key={`${plan.name}-${index}`} className="text-center py-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {plan.features[index].value === '-' ? (
                              <Minus className="h-5 w-5 text-gray-500 mx-auto" />
                            ) : (
                              <span className="text-blue-400">{plan.features[index].value}</span>
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{plan.features[index].value === '-' ? 'Not available' : plan.features[index].value}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

