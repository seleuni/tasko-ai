// app/lab/6-2-intercepting/gallery/layout.tsx
import type { ReactNode } from "react";

interface GalleryLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function GalleryLayout({ children, modal }: GalleryLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}