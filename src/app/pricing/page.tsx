import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-2 text-center">Choose Your Plan</h1>
      <p className="text-base mb-8 text-center text-gray-400">
        Supercharge your cloud infrastructure with our flexible pricing options
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mt-6">
        <Card className="w-full md:w-1/2 bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Free</CardTitle>
            <CardDescription className="text-gray-400">
              For individuals and small projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 py-4 px-8">
            <p className="text-4xl font-bold">
              $0
              <span className="text-xl font-normal text-gray-400">/month</span>
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>5 messages per day</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Basic cloud assistance</span>
              </li>
              <li className="flex items-center">
                <X className="mr-2 h-5 w-5 text-red-500" />
                <span className="text-gray-500">No code generation</span>
              </li>
              <li className="flex items-center">
                <X className="mr-2 h-5 w-5 text-red-500" />
                <span className="text-gray-500">No Pulumi integration</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              disabled
              className="mt-6 w-full bg-button-primary hover:bg-button-hover font-semibold tracking-wide"
            >
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full md:w-1/2 bg-gray-900 border-button-primary border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Pro</CardTitle>
            <CardDescription className="text-gray-400">
              For professionals and teams
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 py-4 px-8">
            <p className="text-4xl font-bold">
              $10
              <span className="text-xl font-normal text-gray-400">/month</span>
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Unlimited messages</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Advanced cloud assistance</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Pulumi code generation</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="mt-6 w-full bg-button-primary hover:bg-button-hover font-semibold tracking-wide">
              Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
