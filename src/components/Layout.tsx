import Main from "./Main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RaceSG",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-8 space-y-10 min-h-screen">
      <Main>{children}</Main>
    </div>
  );
}
