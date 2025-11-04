"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			className={cn("bg-muted relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full", className)}
			{...props}
		/>
	);
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
	return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full", className)} {...props} />;
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
	return (
		<AvatarPrimitive.Fallback data-slot="avatar-fallback" asChild {...props}>
			<UserRound className={cn("size-1/2", className)} />
		</AvatarPrimitive.Fallback>
	);
}

function PlayerAvatarName({ name }: { name: string }) {
	return (
		<div className="flex items-center gap-x-2">
			<Avatar className="size-6 md:size-8">
				<AvatarImage src={`/players/${name}.png`} />
				<AvatarFallback />
			</Avatar>
			<span className="text-sm font-medium capitalize">{name}</span>
		</div>
	);
}

export { Avatar, AvatarImage, AvatarFallback, PlayerAvatarName };
