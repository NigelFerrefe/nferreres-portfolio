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
}

export default function NavLink({
  children,
  href,
  onClick,
  className = "",
  showActiveState = true,
}: NavLinkProps) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0]; 

  const fullHref = href === "/" ? `/${locale}` : `/${locale}${href}`;

  const isActive =
    showActiveState &&
    (pathname === fullHref || pathname.startsWith(`${fullHref}/`));

  return (
    <Link
      href={fullHref}
      onClick={onClick}
      className={`font-display text-1xl uppercase tracking-[0.15em] transition-colors duration-200
        ${isActive ? "text-primary" : "text-primary hover:text-foreground"}
        ${className}`}
    >
      {children}
    </Link>
  );
}