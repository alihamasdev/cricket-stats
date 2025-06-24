import { ScaleLoader } from "react-spinners";

export default function Loading() {
	return (
		<div className="flex h-[calc(100dvh-68px)] w-full items-center justify-center">
			<ScaleLoader width={3} className="*:!bg-foreground" />
		</div>
	);
}
