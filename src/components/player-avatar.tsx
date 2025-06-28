import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function PlayerAvatarName({ name }: { name: string }) {
	const src = `https://lhoxbzrtfoofydgvvfuu.supabase.co/storage/v1/object/public/avatars/${name}.png`;

	return (
		<div className="flex items-center gap-x-2">
			<Avatar className="size-6 md:size-8">
				<AvatarImage src={src} />
				<AvatarFallback />
			</Avatar>
			<p className="font-medium capitalize">{name}</p>
		</div>
	);
}
