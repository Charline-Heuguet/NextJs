"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type PrefetchLinkProps = Omit<ComponentProps<typeof Link>, "prefetch"> & {
  prefetch?: boolean;
  prefetchOnHover?: boolean;
  children: ReactNode;
};

export function PrefetchLink({
  href,
  prefetch = true,
  prefetchOnHover = false,
  children,
  onMouseEnter,
  ...props
}: PrefetchLinkProps) {
  const router = useRouter();
  const hrefString = typeof href === "string" ? href : "";

  if (prefetchOnHover && hrefString) {
    return (
      <Link
        href={href}
        prefetch={false}
        onMouseEnter={(event) => {
          router.prefetch(hrefString);
          onMouseEnter?.(event);
        }}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} prefetch={prefetch} onMouseEnter={onMouseEnter} {...props}>
      {children}
    </Link>
  );
}
