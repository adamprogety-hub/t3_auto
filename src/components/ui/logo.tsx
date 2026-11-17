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
  variant?: "badge" | "plain";
  href?: string;
  onClick?: () => void;
  isFloating?: boolean;
}

/**
 * Фирменный модульный шильдик компании «Т3 Автоматизация»:
 * Знак в квадратном скруглённом бейдже, название в прямоугольном бейдже.
 * Монохромный индустриальный дизайн: темно-графитовый и светло-серый (без оранжевого).
 * Масштаб 1:1 согласован по высоте (48px / h-12) и скруглению (rounded-[12px]) с панелью навигации в херо,
 * и компактный гармоничный размер (40px / h-10) в плавающей капсуле навигации с концентрическими отступами.
 */
export function Logo({
  className = "",
  theme = "dark",
  variant = "badge",
  href = "#",
  onClick,
  isFloating = false,
}: LogoProps) {
  const isLight = theme === "light";

  const content =
    variant === "badge" ? (
      <span
        className={`inline-flex items-center gap-1.5 sm:gap-2 select-none transition-transform duration-200 group-hover:scale-[1.01] ${className}`}
      >
        {/* Квадрат со знаком */}
        <span
          className={`shrink-0 flex items-center justify-center transition-all duration-300 shadow-sm ${
            isFloating
              ? "w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] sm:rounded-[10px]"
              : "w-10 h-10 sm:w-12 sm:h-12 rounded-[10px] sm:rounded-[12px]"
          } ${
            isLight
              ? "bg-[#F8F9FA] text-graphite"
              : "bg-graphite/95 text-[#F8F9FA]"
          }`}
        >
          <LogoMark
            size={isFloating ? 18 : 21}
            className={`w-auto transition-all duration-300 ${
              isFloating ? "h-[15px] sm:h-[18px]" : "h-[17px] sm:h-[21px]"
            }`}
          />
        </span>

        {/* Прямоугольник с названием компании */}
        <span
          className={`flex items-center justify-center transition-all duration-300 shadow-sm font-heading font-bold tracking-tight whitespace-nowrap ${
            isFloating
              ? "h-9 sm:h-10 px-2.5 sm:px-3.5 rounded-[8px] sm:rounded-[10px] text-[13px] sm:text-[14px]"
              : "h-10 sm:h-12 px-3 sm:px-4 rounded-[10px] sm:rounded-[12px] text-[13.5px] sm:text-[15px]"
          } ${
            isLight
              ? "bg-[#F8F9FA] text-graphite"
              : "bg-graphite/95 text-[#F8F9FA]"
          }`}
        >
          <span className="notranslate font-extrabold mr-1.5">Т3</span>
          <span>Автоматизация</span>
        </span>
      </span>
    ) : (
      <span
        className={`inline-flex items-center gap-2 select-none transition-opacity duration-200 group-hover:opacity-90 ${className}`}
      >
        <LogoMark
          size={18}
          className={isLight ? "text-white" : "text-graphite"}
        />
        <span
          className={`font-heading tracking-tight leading-none text-[18px] ${
            isLight ? "text-white" : "text-graphite"
          }`}
        >
          <span className="notranslate font-extrabold mr-1">Т3</span>
          <span className="font-bold">Автоматизация</span>
        </span>
      </span>
    );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className="inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        aria-label="Т3 Автоматизация — главная страница"
      >
        {content}
      </a>
    );
  }

  return content;
}
