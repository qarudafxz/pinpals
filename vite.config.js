import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		VitePWA({
			registerType: "autoUpdate",
			devOptions: {
				enabled: true,
			},
			includeAssets: ["favicon.ico", "apple-touch-icon.png"],
			manifest: {
				name: "PinPal",
				short_name: "PinPal",
				description: "Alternative Pinning Tab App",
				theme_color: "#151618",
				background_color: "#151618",
				start_url: "/",
				icons: [
					{
						src: "/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
				display: "standalone",
			},
		}),
	],
});
