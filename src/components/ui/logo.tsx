import React from "react";

interface LogoMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * 4.0 Precision Logic Gate (Логический Вентиль) SVG Mark
 * Чистая векторная геометрия с прозрачным вырезом (без привязки к цвету фона)
 */
export function LogoMark({ size = 24, className = "", ...props }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      {...props}
    >
      <path
        d="M0 0h50v25L25 50H0ZM50 0l50 50H50ZM0 50l50 50H0ZM50 50h50v50H50Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  theme?: "dark" | "light";
  iconSize?: number;
  href?: string;
  onClick?: () => void;
}

/**
 * Фирменный логотип компании «АЦИнжиниринг»
 * Строго без слогана, с идеальным балансом знака 4.0 и кириллического гротеска
 */
export function Logo({
  className = "",
  theme = "dark",
  iconSize = 24,
  href = "#",
  onClick,
}: LogoProps) {
  const isLight = theme === "light";

  const content = (
    <span
      className={`inline-flex items-center gap-2.5 select-none transition-opacity duration-200 group-hover:opacity-90 ${className}`}
    >
      <LogoMark
        size={iconSize}
        className={`transition-transform duration-300 ease-out group-hover:scale-105 ${
          isLight ? "text-white" : "text-graphite"
        }`}
      />
      <span
        className={`font-heading tracking-tight leading-none text-[17px] sm:text-[18px] ${
          isLight ? "text-white" : "text-graphite"
        }`}
      >
        <span className="font-black">АЦ</span>
        <span className={`font-bold ${isLight ? "text-white/90" : "text-graphite/95"}`}>
          Инжиниринг
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className="inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        aria-label="АЦИнжиниринг — главная страница"
      >
        {content}
      </a>
    );
  }

  return content;
}
