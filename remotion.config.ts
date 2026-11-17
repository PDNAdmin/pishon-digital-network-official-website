import { Config } from "@remotion/cli/config";

// Scenes reference /public via staticFile(), shared with the Next.js site.
Config.setPublicDir("public");
Config.setVideoImageFormat("jpeg");
