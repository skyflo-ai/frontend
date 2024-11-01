import { IndianRupee, DollarSign } from "lucide-react";

export const dashboardTabsData = [
  {
    name: "Stock Market",
  },
  {
    name: "Technology",
  },
  {
    name: "Quantum Computing",
  },
];

export const instrumentsData = [
  {
    id: "nifty50",
    title: "Nifty 50",
    value: "18,563.40",
    change: "+0.52%",
    icon: <IndianRupee className="h-3 w-3" />,
  },
  {
    id: "gold",
    title: "Gold",
    value: "$1,977.40",
    change: "-0.18%",
    icon: <DollarSign className="h-3 w-3" />,
  },
  {
    id: "sp500",
    title: "S&P 500",
    value: "4,169.48",
    change: "+0.09%",
    icon: <DollarSign className="h-3 w-3" />,
  },
];

export const chatSuggestions = [
  "Summarize the dashboard",
  "Connect different ideas & provide actionable insights",
];

export const stockMarketNewsData = [
  {
    title: "Global",
    type: "news",
    news: [
      {
        title: "Global climate summit reaches landmark agreement",
        description:
          "World leaders commit to aggressive carbon reduction targets.",
      },
      {
        title: "International space station celebrates 25 years in orbit",
        description:
          "Astronauts from 19 countries mark the milestone with a special broadcast.",
      },
    ],
  },
  {
    title: "r/StockMarket",
    type: "subreddit",
    news: [
      {
        title: "Daily Discussion Thread",
        description:
          "Join the discussion on the latest market trends and news.",
      },
      {
        title: "Earnings Season!",
        description:
          "Post your thoughts on earnings reports for major companies.",
      },
    ],
  },
  {
    title: "NASDAQ: AAPL",
    type: "ticker",
    news: [
      {
        title: "Apple unveils new iPhone 15 with groundbreaking features",
        description:
          "The tech giant introduces its latest model with improved camera and battery life.",
      },
      {
        title: "Apple announces stock buyback program amid strong earnings",
        description:
          "Company reveals plans to repurchase $100 billion worth of shares.",
      },
    ],
  },
  {
    title: "X (Twitter)",
    type: "x",
    news: [
      {
        title: "Elon Musk tweets about AI regulation",
        description:
          "Musk emphasizes the need for oversight in developing AI technologies.",
      },
      {
        title: "Breaking: Tesla stock surges",
        description:
          "Tesla stock jumps after positive quarterly earnings report.",
      },
    ],
  },
];

export const stockMarketSummary = [
  "The Stock Market dashboard integrates various global, U.S., and sector-specific news, providing a comprehensive view of major events shaping market dynamics. Global developments, such as the commitment to aggressive carbon reduction targets, breakthroughs in fusion energy, and recovery signs post-pandemic, are fostering optimism in long-term growth sectors like renewable energy and healthcare. The rising influence of AI in medical diagnostics and the announcement of major quantum computing milestones also signal robust innovation across industries.",
  "In the U.S., the Federal Reserve's decision to hold interest rates steady supports market stability, while tech giants face antitrust scrutiny, potentially introducing regulatory headwinds for companies like Google and Apple. U.S.-China trade talks resuming is another key event, as it can ease economic tension and influence global trade flows, benefiting both tech and manufacturing sectors.",
  "The S&P 500, buoyed by strong earnings across sectors, reflects optimism, particularly in the energy sector, driven by surging oil prices. Tech stocks, however, face minor pullbacks due to profit-taking, though companies like Apple and Google continue to post strong growth. Apple’s new product launches and stock buyback programs are driving the stock to historic highs, reinforcing investor confidence. Meanwhile, Google’s focus on AI and autonomous driving highlights the company’s leadership in next-generation technologies, despite facing regulatory challenges in Europe.",
  "Actionable Insight: Investors should monitor global recovery trends, particularly in energy, AI, and healthcare sectors, while staying informed on regulatory developments affecting tech giants like Google and Apple. The S&P 500’s strong performance and positive earnings signal potential buying opportunities, especially in sectors showing resilience.",
];
