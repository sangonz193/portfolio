import "./landing.css";

import { MousePositionProvider } from "./mouse-position/provider";
import { WindowSizeProvider } from "../../modules/window-size/provider";
import { compactProviders } from "@/lib/react/compact-providers";
import { ComponentProps } from "react";
import { Link } from "./link";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const Providers = compactProviders([WindowSizeProvider, MousePositionProvider]);

const links: ComponentProps<typeof Link>[] = [
  {
    href: "https://www.linkedin.com/in/santiagorgonzalez",
    Icon: LinkedInLogoIcon,
    alt: "Santiago's LinkedIn",
    color: "#0762C8",
  },
  {
    href: "https://github.com/sangonz193",
    Icon: GitHubLogoIcon,
    color: "#6a6e73",
    alt: "Santiago's GitHub",
  },
];

export function Landing() {
  return (
    <Providers>
      <div className="min-h-screen">
        <div className="absolute inset-0 blur-3xl opacity-40">
          <Blob />
        </div>
        <div className="my-auto gap-14 relative">
          <h1 className="relative text-7xl lg:text-8xl text-center font-bold px-6">
            Santiago González
          </h1>

          <div className="mx-auto gap-5 flex-row">
            {links.map((link) => (
              <Link key={link.href} {...link} />
            ))}
          </div>

          <div className="h-32" />
        </div>
      </div>
    </Providers>
  );
}

function Blob() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute bg-red-300 opacity-20 rounded-t-full animate-[blob_60s_linear_infinite] bottom-0 w-full" />
    </div>
  );
}
