export function IconNote({ size = 24, color = '#ffffff', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 23 25"
      fill="none"
    >
      <rect
        x="0.65"
        y="2.67539"
        width="21.2859"
        height="20.7513"
        rx="4.01666"
        stroke={color}
        strokeWidth="1.3"
      />
      <path d="M6 4.65039V0.650391" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M19 4.65039V0.650391" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M5.29297 9.16504C5.29297 9.16504 12.6067 9.16504 17.293 9.16504"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M5.29297 13.417C5.29297 13.417 12.6067 13.417 17.293 13.417"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M8.09961 18.0479C8.09961 18.0479 9.80151 18.0479 14.4878 18.0479"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
