import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export function DataLoomInfoWindow() {
  return (
    <div className="grow bg-background/70 p-4 overflow-auto max-h-full basis-0">
      <div className="mx-auto w-full max-w-lg">
        <div className="flex-row gap-2 flex-wrap">
          <Button variant="secondary" asChild>
            <Link
              href="https://github.com/sangonz193/data-loom"
              className="flex items-center"
              target="_blank"
            >
              <GitHubLogoIcon className="size-4" />
              GitHub Repo
            </Link>
          </Button>

          <Button variant="secondary" asChild>
            <Link
              href="https://data-loom.sgonzalez.dev"
              className="flex items-center"
              target="_blank"
            >
              <ExternalLinkIcon className="size-4" />
              Live Site
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="motivation" className="my-4">
          <TabsList className="flex-row mr-auto">
            <TabsTrigger value="motivation">Motivation</TabsTrigger>
            <TabsTrigger value="technologies">Technologies</TabsTrigger>
          </TabsList>

          <TabsContent value="motivation" className="px-2 flex flex-col gap-2">
            <p>
              Data Loom aims to provide a hassle-free and secure way to share
              files between devices. The platform leverages WebRTC technology,
              ensuring that your files are transferred directly and securely,
              with no intermediary server access.
            </p>

            <p>
              While other direct file transfer services exist, Data Loom is
              unique in that:
            </p>

            <ul className="list-disc ml-4 flex flex-col gap-2">
              <li>
                It does not require the user to create an account, yet still
                provides a secure experience. Account creation is automatically
                handled in the background.
              </li>
              <li>
                Users can connect devices just by entering a simple numeric code
                that&apos;s only valid for 5 minutes.
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="technologies" className="px-2">
            <ul className="list-disc ml-4">
              <li>
                <Button variant="link" asChild className="px-0 h-auto">
                  <Link
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Next.js v14
                    <ExternalLinkIcon className="size-4" />
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="px-0 h-auto">
                  <Link
                    href="https://supabase.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Supabase
                    <ExternalLinkIcon className="size-4" />
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="px-0 h-auto">
                  <Link
                    href="https://ui.shadcn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shadcn UI
                    <ExternalLinkIcon className="size-4" />
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild className="px-0 h-auto">
                  <Link
                    href="https://webrtc.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WebRTC
                    <ExternalLinkIcon className="size-4" />
                  </Link>
                </Button>
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
