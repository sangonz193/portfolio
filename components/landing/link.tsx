import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { BlurLinkBox } from "./color-box"

type Props = {
  href: string
  Icon: typeof GitHubLogoIcon
  alt: string
  color: string
  className?: string
}

export function Link({ href, Icon, alt, color, className }: Props) {
  return (
    <BlurLinkBox
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      title={alt}
      color={color}
    >
      <span className="sr-only">{alt}</span>

      <Icon className="relative m-auto size-10 scale-90 transition-transform duration-300 group-hover:scale-100" />
    </BlurLinkBox>
  )
}
