import localFont from "next/font/local";

export const cwc = localFont({
	src: [
		{
			path: "./cwc-light.otf",
			weight: "300"
		},
		{
			path: "./cwc-regular.otf",
			weight: "400"
		},
		{
			path: "./cwc-medium.woff2",
			weight: "500"
		},
		{
			path: "./cwc-semibold.woff2",
			weight: "600"
		},
		{
			path: "./cwc-bold.otf",
			weight: "700"
		}
	],
	variable: "--font-chirp",
	weight: "300 400 500 600 700"
});
