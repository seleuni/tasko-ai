import type { ReactNode } from "react";

interface HelpLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function HelpLayout({children, modal}: HelpLayoutProps) {
  return(
    <main className="mx-auto max-w-xl px-4 py-8">
      {children}
      {modal}
    </main>
  );
}