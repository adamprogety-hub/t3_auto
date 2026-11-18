import React from "react";

interface LogoMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Фирменный знак Т3 (векторный логотип из logo_t3.svg)
 * Пропорции 813 : 536 (~1.517 : 1)
 */
export function LogoMark({ size = 16, className = "", ...props }: LogoMarkProps) {
  const width = Math.round(size * (813 / 536));
  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 813 536"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M776.429 54.9131C776.381 54.9683 776.311 55 776.238 55C776.168 55 776.101 55.0292 776.053 55.0806L328.46 534.813C328.357 534.924 328.272 535.051 328.211 535.191C327.993 535.683 327.505 536.001 326.966 536.001H267.355C267.355 536.001 267.354 536.001 267.354 536C267.354 536 267.354 536 267.354 536H10.0124C2.707 536 -2.13279 528.421 0.940057 521.794L17.1673 486.794C18.8054 483.261 22.3454 481 26.2397 481H285.235C289.19 481 292.774 478.669 294.377 475.053L474.381 69.0531C477.312 62.4411 472.472 55 465.239 55H121.431C113.569 55 108.782 46.3461 112.959 39.6862L134.914 4.68617C136.743 1.77027 139.943 0 143.385 0H802.354C810.939 0 815.533 10.1068 809.888 16.5753L776.429 54.9131ZM327.334 284.02C325.739 287.653 322.146 290 318.178 290H161.666C154.2 290 149.367 282.116 152.754 275.463L170.572 240.463C172.279 237.111 175.722 235 179.484 235H333.542C340.759 235 345.6 242.411 342.699 249.02L327.334 284.02Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  theme?: "dark" | "light";
  iconSize?: number;
  variant?: "badge" | "plain" | "split";
  href?: string;
  onClick?: () => void;
  isFloating?: boolean;
}

/**
 * Фирменный стиль логотипа компании «Т3 Автоматизация»:
 * Векторный фирменный знак и название компании, разделённые аккуратной тонкой вертикальной линией.
 * Чистый индустриальный дизайн без фоновых плашек.
 */
export function Logo({
  className = "",
  theme = "dark",
  href = "#",
  onClick,
  isFloating = false,
}: LogoProps) {
  const isLight = theme === "light";

  const content = (
    <span
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none transition-opacity duration-200 group-hover:opacity-85 ${className}`}
    >
      {/* Фирменный векторный знак Т3 */}
      <LogoMark
        size={isFloating ? 18 : 22}
        className={`w-auto shrink-0 transition-all duration-300 ${
          isLight ? "text-white" : "text-graphite"
        } ${isFloating ? "h-[16px] sm:h-[18px]" : "h-[18px] sm:h-[22px]"}`}
      />

      {/* Аккуратная вертикальная разделительная линия */}
      <span
        className={`w-px shrink-0 transition-all duration-300 ${
          isFloating ? "h-4 sm:h-4.5" : "h-5 sm:h-5.5"
        } ${isLight ? "bg-white/25" : "bg-divider"}`}
        aria-hidden="true"
      />

      {/* Название компании */}
      <span
        className={`font-heading font-bold tracking-tight whitespace-nowrap transition-all duration-300 ${
          isFloating
            ? "text-[13.5px] sm:text-[14.5px]"
            : "text-[15px] sm:text-[16px]"
        } ${isLight ? "text-white" : "text-graphite"}`}
      >
        <span className="notranslate font-extrabold mr-1.5">Т3</span>
        <span>Автоматизация</span>
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className="inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1"
        aria-label="Т3 Автоматизация — главная страница"
      >
        {content}
      </a>
    );
  }

  return content;
}
