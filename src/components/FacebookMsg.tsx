"use client";
import { FacebookProvider, CustomChat } from "react-facebook";
import { FACEBOOK_CONFIG } from "@/constants/config";

export default function FacebookMsg() {
  return (
    <FacebookProvider appId={FACEBOOK_CONFIG.APP_ID} chatSupport>
      <CustomChat pageId={FACEBOOK_CONFIG.PAGE_ID} minimized={false} />
    </FacebookProvider>
  );
}
