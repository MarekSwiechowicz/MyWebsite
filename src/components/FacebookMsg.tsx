"use client";
import { FacebookProvider, CustomChat } from "react-facebook";

export default function FacebookMsg() {
  const minimized = true;

  return (
    <FacebookProvider appId="367844942889515" chatSupport>
      <CustomChat pageId="508564492876108" minimized={"false" as any} />
    </FacebookProvider>
  );
}
