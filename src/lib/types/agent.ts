import { IconType } from "react-icons";

interface Agent {
  title: string;
  path: string;
  pusherChannel: string;
  description: string;
  detailed_description: string;
  suggestions: {
    text: string;
    icon: IconType;
    category: string;
  }[];
  icon: IconType;
}

export type { Agent };
