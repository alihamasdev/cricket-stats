"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function SheetLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	return (
		<Sheet open={true} onOpenChange={() => router.back()}>
			<SheetContent className="overflow-y-auto">
				<SheetTitle hidden />
				<SheetDescription hidden />
				<SheetClose asChild>
					<Button variant="outline" size="icon" className="absolute top-4 right-4 size-8">
						<X />
					</Button>
				</SheetClose>

				{children}
			</SheetContent>
		</Sheet>
	);
}
