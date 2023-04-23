import { type AvailableAuthProviders } from "@/types/auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Provider = {
  provider?: AvailableAuthProviders;
};

export default function Auth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { provider }: Provider = router.query;

  if (!(status === "loading") && !session) void signIn(provider);
  if (session) window.close();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "white",
      }}
    ></div>
  );
}
