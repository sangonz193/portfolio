import { WindowConfig } from "./window-config";

type Props = {
  icon: WindowConfig["icon"];
  className: string;
};

export function WindowIcon(props: Props) {
  const { className, icon } = props;

  if (icon.type === "url") {
    return <img src={icon.src} className={className} />;
  }

  const Icon = icon.component;
  return <Icon className={className} />;
}
