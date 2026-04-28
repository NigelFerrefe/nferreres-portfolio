"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinkProps {
  children: ReactNode;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  showActiveState?: boolean;
  size?: "default" | "sm";
}

export default function NavLink({
  children,
  href,
  onClick,
  className = "",
  showActiveState = true,
  size = "default",
}: NavLinkProps) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] || "es";

  const fullHref = href === "/" ? `/${locale}` : `/${locale}${href}`;

  const isActive =
    showActiveState &&
    (pathname === fullHref || pathname.startsWith(`${fullHref}/`));

const sizeStyles =
  size === "sm"
    ? "font-body text-md uppercase"
    : "font-display text-base uppercase tracking-[0.15em]";

  return (
    <Link
      href={fullHref}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`${sizeStyles} transition-colors duration-200
        ${isActive ? "text-primary" : "text-primary hover:text-foreground"}
        ${className}`}
    >
      {children}
    </Link>
  );
}