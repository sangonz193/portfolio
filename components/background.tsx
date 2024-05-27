import "./background.css"

import { observer } from "mobx-react-lite"
import { lighten } from "polished"
import { ComponentProps, useEffect, useRef } from "react"

import { cn } from "@/lib/cn"
import { mousePositionStore } from "@/modules/mouse-position/store"
import { viewportSizeStore } from "@/modules/viewport/size-store"
import { clamp } from "@/utils/clamp"

type Props = ComponentProps<"svg">

export const Background = observer((props: Props) => {
  const { position: mousePosition } = mousePositionStore

  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (!ref.current) return

    if (!mousePosition) {
      ref.current.style.setProperty("--dx-percentage", 0 + "")
      return
    }

    const dxPercentage = clamp(
      ((mousePosition.x - viewportSizeStore.width / 2) /
        (viewportSizeStore.width / 2)) *
        100,
      -100,
      100,
    )

    ref.current.style.setProperty("--dx-percentage", dxPercentage + "")
  }, [mousePosition, mousePosition?.x])

  return (
    <svg
      ref={ref}
      viewBox="0 0 1440 1024"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      {...props}
      className={cn("background", props.className)}
    >
      <defs>
        <radialGradient
          id="background-rect-gradient-light"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1410 236.5) rotate(-170.41) scale(1806.75 2540.74)"
        >
          <stop stopColor={lighten(0.6, "#050090")} />
          <stop offset="1" stopColor={lighten(0.8, "#02002F")} />
        </radialGradient>
        <radialGradient
          id="background-rect-gradient-dark"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1410 236.5) rotate(-170.41) scale(1806.75 2540.74)"
        >
          <stop stopColor="#050090" />
          <stop offset="1" stopColor="#02002F" />
        </radialGradient>
        <linearGradient
          id="background-path-1-gradient-light"
          x1="457.5"
          y1="400.5"
          x2="232"
          y2="840.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ff00ff" />
          <stop offset="0.572176" stopColor={lighten(0.2, "#791149")} />
        </linearGradient>
        <linearGradient
          id="background-path-1-gradient-dark"
          x1="457.5"
          y1="400.5"
          x2="232"
          y2="840.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#c91d78" />
          <stop offset="0.572176" stopColor="#791149" />
        </linearGradient>
        <linearGradient
          id="background-path-2-gradient-light"
          x1="782.5"
          y1="350"
          x2="488"
          y2="902.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ff00ff" />
          <stop offset="1" stopColor={lighten(0.15, "#4f0d59")} />
        </linearGradient>
        <linearGradient
          id="background-path-2-gradient-dark"
          x1="782.5"
          y1="350"
          x2="488"
          y2="902.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B21DC9" />
          <stop offset="1" stopColor="#4f0d59" />
        </linearGradient>
        <linearGradient
          id="background-path-3-gradient-light"
          x1="656.5"
          y1="310"
          x2="1286"
          y2="873.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={lighten(0.2, "#9F20DF")} />
          <stop offset="0.930388" stopColor={lighten(0.2, "#571179")} />
        </linearGradient>
        <linearGradient
          id="background-path-3-gradient-dark"
          x1="656.5"
          y1="310"
          x2="1286"
          y2="873.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9F20DF" />
          <stop offset="0.930388" stopColor="#571179" />
        </linearGradient>
        <radialGradient
          id="background-path-4-gradient-light"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(247 305) rotate(102.118) scale(688.338 1765.69)"
        >
          <stop stopColor={lighten(0.3, "#8020DF")} />
          <stop offset="1" stopColor={lighten(0.2, "#451179")} />
        </radialGradient>
        <radialGradient
          id="background-path-4-gradient-dark"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(247 305) rotate(102.118) scale(688.338 1765.69)"
        >
          <stop stopColor="#8020DF" />
          <stop offset="1" stopColor="#451179" />
        </radialGradient>
        <clipPath id="clip0_4_13">
          <rect width="1440" height="1024" fill="white" />
        </clipPath>
      </defs>

      <filter id="grainy">
        <feTurbulence type="turbulence" baseFrequency="0.7" />
        <feComposite operator="in" in="SourceGraphic" />
        <feColorMatrix type="saturate" values="0" />
      </filter>

      <g clipPath="url(#clip0_4_13)">
        <rect width="1440" height="1024" className="background-rect" />
        <path
          d="M1374.5 365.231C1672.5 359.373 1744.83 466.246 1774 514.5L1828 1071.02C1780.17 1117.77 1671.1 1208.34 1617.5 1196.63C1563.9 1184.91 774.833 1220.66 387 1240L-149 1112.7V529.145C-149 529.145 80.5 472.301 276.5 442.4C472.5 412.5 557.5 623.5 661.5 669.5C765.5 715.5 835.175 781.211 1133 677.46C1333.5 607.614 1002 372.554 1374.5 365.231Z"
          className="background-path-1"
        />
        <path
          d="M1374.5 365.231C1672.5 359.373 1744.83 466.246 1774 514.5L1828 1071.02C1780.17 1117.77 1671.1 1208.34 1617.5 1196.63C1563.9 1184.91 774.833 1220.66 387 1240L-149 1112.7V529.145C-149 529.145 36 842.4 232 812.5C428 782.6 422 649.686 539 574.207C656 498.728 719.5 445.5 794 445.5C868.5 445.5 883.5 706.014 1084 636.167C1284.5 566.321 1002 372.554 1374.5 365.231Z"
          className="background-path-2"
        />
        <path
          d="M490 1111.1C490 1111.1 1334.5 -250.4 1687 -236.9C2039.5 -223.4 2100 729.6 2100 729.6L1759.5 1165.6L490 1111.1Z"
          className="background-path-3"
        />
        <path
          d="M105.5 411.341C-77.7 317.312 -149.833 450.519 -163 528.877L-186 1085H1625V944.279C1599.33 951.792 1515.5 967.206 1385.5 968.752C1223 970.684 557 997.089 405.5 835.759C254 674.429 334.5 528.877 105.5 411.341Z"
          className="background-path-4"
        />
      </g>
    </svg>
  )
})
