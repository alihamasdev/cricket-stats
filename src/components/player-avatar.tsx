import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function PlayerAvatarName({ name }: { name: string }) {
	const src = `https://bwjvprpftuxqfgnysvuz.supabase.co/storage/v1/object/public/avatars/${name}.png`;

	return (
		<div className="flex items-center gap-x-2">
			<Avatar>
				<AvatarImage src={src} />
				<AvatarFallback />
			</Avatar>
			<p className="font-medium capitalize">{name}</p>
		</div>
	);
}
