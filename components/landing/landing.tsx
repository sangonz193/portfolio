"use client";

import "./landing.css";

import { ViewportSizeProvider } from "../../modules/viewport-size/provider";
import { compactProviders } from "@/lib/react/compact-providers";
import { ComponentProps, createRef } from "react";
import { Link } from "./link";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { githubInfo } from "@/modules/info/github";
import { linkedInInfo } from "@/modules/info/linked-in";
import { BlurLinkBox } from "./blur-link-box";
import { ChevronRightIcon } from "lucide-react";

const parentRef = createRef<HTMLDivElement>();

const Providers = compactProviders([
  (props) => <ViewportSizeProvider {...props} parentRef={parentRef} />,
]);

const links: ComponentProps<typeof Link>[] = [
  {
    href: githubInfo.url,
    Icon: GitHubLogoIcon,
    color: "#6a6e73",
    alt: "Santiago's GitHub",
  },
  {
    href: linkedInInfo.url,
    Icon: LinkedInLogoIcon,
    alt: "Santiago's LinkedIn",
    color: "#0762C8",
  },
];

export function Landing() {
  return (
    <Providers>
      <div ref={parentRef} className="min-h-screen">
        <div className="absolute inset-0 blur-3xl opacity-40">
          <Blob />
        </div>
        <div className="my-auto gap-14 relative">
          <h1 className="relative text-7xl lg:text-8xl text-center font-bold px-6">
            Santiago González
          </h1>

          <div className="mx-auto gap-5 grid grid-cols-[100px_100px] grid-rows-[100px_1fr]">
            {links.map((link) => (
              <Link key={link.href} {...link} />
            ))}

            <BlurLinkBox
              href="/os"
              color="violet"
              className="col-span-full w-auto"
            >
              <div className="relative items-center max-w-full flex-row grow px-3 my-auto py-1">
                <span className="shrink basis-0 grow font-medium min-w-0">
                  Explore Interactive Portfolio
                </span>
                <ChevronRightIcon className="size-7 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </BlurLinkBox>
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
