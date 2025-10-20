import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { SmartIcon } from "@/shared/blocks/common/smart-icon";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <Image src="/logo.png" alt="Logo" width={80} height={80} />
      <h1 className="text-2xl font-normal">Page not found</h1>
      <Button asChild>
        <Link href="/" className="mt-4">
          <SmartIcon name="ArrowLeft" />
          <span>Back to Home</span>
        </Link>
      </Button>
    </div>
  );
}
