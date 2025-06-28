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
				<SheetHeader className="flex-row justify-between">
					<SheetTitle className="text-2xl">Add Stats</SheetTitle>
					<SheetDescription />
					<SheetClose asChild>
						<Button variant="outline" size="icon" className="size-8">
							<X />
						</Button>
					</SheetClose>
				</SheetHeader>
				{children}
			</SheetContent>
		</Sheet>
	);
}
