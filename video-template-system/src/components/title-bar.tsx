"use client";
import { usePathname } from "next/navigation";

export default function TitleBar() {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/": "Video Template Editor",
    "/template-select": "Template Selection",
    "/video-editor": "Video Editor",
  };

  const title = titles[pathname] || "Video Template Editor";

  return (
    <header className="w-full bg-background-header text-white py-4 px-6">
      <h1 className="text-3xl text-title-text font-bold">{title}</h1>
    </header>
  );
}