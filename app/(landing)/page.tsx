import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function LandingPage() {
  return (
    <main className="">
      <Editor />
      <Button>Click</Button>
    </main>
  );
}
