import type { SVGProps } from "react";

export function BrandSymbol({ size = 38, className = "", ...props }: { size?: number; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 272"
      width={size}
      height={size}
      role="img"
      aria-labelledby="logo-title"
      className={className}
      {...props}
    >
      <title id="logo-title">Growth V Logo</title>
      <polygon points="27,58 96,58 70,118" fill="#1a8a5c" />
      <polygon points="27,58 70,118 108,197" fill="#0d5c40" />
      <polygon points="70,118 124,152 108,197" fill="#12714d" />

      <polygon points="124,152 196,92 108,197" fill="#14214a" />
      <polygon points="96,62 121,104 100,98" fill="#14214a" />

      <polygon points="78,125 100,104 124,127 186,70 202,86 124,152 100,132" fill="#1f9e6a" />
      <polygon points="100,104 124,127 100,132 78,125" fill="#2bb67b" />

      <polygon points="224,38 166,52 210,94" fill="#0d5c40" />
      <polygon points="224,38 166,52 188,73" fill="#1a8a5c" />
    </svg>
  );
}
