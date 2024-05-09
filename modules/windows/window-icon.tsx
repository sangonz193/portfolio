import { WindowConfig } from "./window-config";

type Props = {
  icon: WindowConfig["icon"];
  className: string;
};

export function WindowIcon(props: Props) {
  const { className, icon } = props;

  if (icon.type === "url") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={icon.src} className={className} alt="Icon of the app" />;
  }

  const Icon = icon.component;
  return <Icon className={className} />;
}
