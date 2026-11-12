import React from "react";

interface LogoMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Т3 Инженерный Знак (T3 Precision Industrial Mark)
 * Лаконичная векторная геометрия промышленной автоматизации
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
      <rect width="100" height="100" rx="20" fill="currentColor" fillOpacity="0.08" />
      <path
        d="M20 28H56V40H44V76H32V40H20V28Z"
        fill="currentColor"
      />
      <path
        d="M58 28H80V40H68V46H78V58H68V64H80V76H58V64H70V58H60V46H70V40H58V28Z"
        fill="#E66826"
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
 * Фирменный текстовый логотип компании «Т3 Автоматизация»
 */
export function Logo({
  className = "",
  theme = "dark",
  href = "#",
  onClick,
}: LogoProps) {
  const isLight = theme === "light";

  const content = (
    <span
      className={`inline-flex items-center select-none transition-opacity duration-200 group-hover:opacity-90 ${className}`}
    >
      <span
        className={`font-heading tracking-tight leading-none text-[18px] sm:text-[19px] ${
          isLight ? "text-white" : "text-graphite"
        }`}
      >
        <span className="font-extrabold text-[#E66826]">Т3</span>{" "}
        <span className={`font-bold ${isLight ? "text-white/95" : "text-graphite/95"}`}>
          Автоматизация
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
        aria-label="Т3 Автоматизация — главная страница"
      >
        {content}
      </a>
    );
  }

  return content;
}
