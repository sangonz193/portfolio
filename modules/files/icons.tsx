import { SVGProps } from "react"

type Props = SVGProps<SVGSVGElement>

export function FolderFileIcon({ className }: Props) {
  return (
    <svg
      viewBox="4 10 56 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 20.5C6 16.9 8.9 14 12.5 14h13.8c2 0 3.8.9 5.1 2.4l3.5 4.1h16.6c3.6 0 6.5 2.9 6.5 6.5v21.5c0 3.6-2.9 6.5-6.5 6.5h-39C8.9 55 6 52.1 6 48.5v-28Z"
        fill="#F7B84B"
      />
      <path
        d="M6 26.5C6 22.9 8.9 20 12.5 20h14.7c1.8 0 3.5.8 4.8 2l2.1 2h17.4c3.6 0 6.5 2.9 6.5 6.5v18c0 3.6-2.9 6.5-6.5 6.5h-39C8.9 55 6 52.1 6 48.5v-22Z"
        fill="#FFD56A"
      />
      <path
        d="M9 30.5C9 27.5 11.5 25 14.5 25h35c3 0 5.5 2.5 5.5 5.5v16c0 3-2.5 5.5-5.5 5.5h-35c-3 0-5.5-2.5-5.5-5.5v-16Z"
        fill="#F2A93B"
      />
      <path
        d="M13 29h38c2.2 0 4 1.8 4 4v13.5c0 3-2.5 5.5-5.5 5.5h-35C11.5 52 9 49.5 9 46.5V33c0-2.2 1.8-4 4-4Z"
        fill="#FFCE58"
      />
    </svg>
  )
}

export function LinkFileIcon({ className }: Props) {
  return (
    <svg
      viewBox="5 4 52 58"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 7h25l11 11v36c0 3.3-2.7 6-6 6H14c-3.3 0-6-2.7-6-6V13c0-3.3 2.7-6 6-6Z"
        fill="#DDF7FF"
      />
      <path d="M39 7v9c0 2.2 1.8 4 4 4h7L39 7Z" fill="#8BD8FF" />
      <path
        d="M15 19c0-2.2 1.8-4 4-4h14"
        stroke="#72C7F2"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M26 43 45 24m0 0H33m12 0v12"
        stroke="#1976D2"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 31h-1c-3.3 0-6 2.7-6 6v5c0 3.3 2.7 6 6 6h5"
        stroke="#58B9F0"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function DocumentFileIcon({ className }: Props) {
  return (
    <svg
      viewBox="5 3 52 60"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 5h28l11 11v39c0 3.3-2.7 6-6 6H13c-3.3 0-6-2.7-6-6V11c0-3.3 2.7-6 6-6Z"
        fill="#F8FAFC"
      />
      <path d="M41 5v9c0 2.2 1.8 4 4 4h7L41 5Z" fill="#CBD5E1" />
      <path
        d="M17 27h30M17 37h30M17 47h22"
        stroke="#64748B"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M13 5h28l11 11v39c0 3.3-2.7 6-6 6H13c-3.3 0-6-2.7-6-6V11c0-3.3 2.7-6 6-6Z"
        stroke="#94A3B8"
        strokeWidth="2"
      />
    </svg>
  )
}
