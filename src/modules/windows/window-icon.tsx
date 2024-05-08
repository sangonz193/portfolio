import { WindowConfig } from "./window-config";

type Props = {
  config: WindowConfig;
  className: string;
};

export function WindowIcon(props: Props) {
  const { className } = props;
  const { icon } = props.config;

  if (icon.type === "url") {
    return <img src={icon.src} className={className} />;
  }

  const Icon = icon.component;
  return <Icon className={className} />;
}
