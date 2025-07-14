import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Button size="sm" disabled>
        <Loader2Icon className="animate-spin" />
        Please wait
      </Button>
    </div>
  );
}
