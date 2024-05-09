export type WindowConfig = {
  id: string;
  name: string;
  content:
    | {
        type: "url";
        href: string;
      }
    | {
        type: "component";
        component: React.ComponentType<Record<string, never>>;
      };
  icon:
    | {
        type: "url";
        src: string;
      }
    | {
        type: "component";
        component: React.ComponentType<{ className?: string }>;
      };
  minSize: {
    width: number;
    height: number;
  };
  infoWindow?: WindowConfig;
};
