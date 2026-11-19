import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROJECT 50 | 웹사이트 프로젝트 스튜디오",
  description: "50개의 홈페이지를 기획하고, 디자인하고, 개발하고, 관리하는 통합 프로젝트 스튜디오",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
