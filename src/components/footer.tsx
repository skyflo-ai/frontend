import Image from "next/image";

import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-gray-400">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:cursor-pointer"
        onClick={() => handleClick("/about")}
      >
        About
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:cursor-pointer"
        onClick={() => handleClick("/pricing")}
      >
        Pricing
      </a>
    </footer>
  );
}
