import { WindowConfig } from "@/modules/windows/window-config";
import { DataLoomInfoWindow } from "./data-loom/info-window";

export type Application = {
  name: string;
  icon: string;
  href: string;
  infoWindow?: WindowConfig;
};

export const applications: Application[] = [
  {
    name: "Data Loom",
    icon: "https://data-loom-portfolio.sgonzalez.dev/favicon.ico",
    href: "https://data-loom-portfolio.sgonzalez.dev",
    infoWindow: {
      id: "data-loom-info",
      name: "Data Loom Info",
      icon: {
        type: "url",
        src: "https://data-loom-portfolio.sgonzalez.dev/favicon.ico",
      },
      content: {
        type: "component",
        component: DataLoomInfoWindow,
      },
      minSize: { width: 300, height: 400 },
    },
  },
];
