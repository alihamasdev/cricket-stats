import { ComparePlayerChanger } from "./compare-player";

export default async function CompareLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mb-auto w-full max-w-100 space-y-6">
			<h1 className="text-left text-2xl font-bold capitalize md:text-center">Compare Stats</h1>
			<ComparePlayerChanger />
			{children}
		</div>
	);
}
