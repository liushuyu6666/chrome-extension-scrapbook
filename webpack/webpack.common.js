const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const CopyPlugin = require("copy-webpack-plugin");

const srcDir = path.join(__dirname, "..", "src");
const rootDir = path.join(srcDir, "..");
const distDir = path.join(rootDir, "dist");
const utilsDir = path.join(srcDir, "utils");

const entryArray = ["popup", "text_chunk", "background", "options"];
const extensions = ["css", "html"];

const entries = entryArray.reduce((acc, entry) => {
	const fullPath = path.join(srcDir, entry, `${entry}.tsx`);
	if (fs.existsSync(fullPath)) {
		acc[entry] = fullPath;
	}
	return acc;
}, {});
const copyPatterns = entryArray.reduce((acc, entry) => {
	extensions.forEach((extension) => {
		const relPath = path.join(entry, `${entry}.${extension}`);
		const fullPath = path.join(srcDir, relPath);
		if (fs.existsSync(fullPath)) {
			acc.push({
				from: path.join(entry, `${entry}.${extension}`),
				to: entry, // [distDir]/[entry]
				context: srcDir,
			});
		}
	});
	return acc;
}, []);

module.exports = {
	entry: entries,
	output: {
		path: distDir,
		filename: "[name]/[name].js",
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				// Copy only files from src/ root to dist/
				{
					from: "*.*", // Matches all files in src/ root
					to: "./", // Copies them to dist/
					context: "src", // Base directory for 'from'
					globOptions: {
						nodir: true, // Excludes all directories and their contents
					},
				},
				{ from: "icons", to: "icons" }, // icons
				...copyPatterns,
			],
			options: {},
		}),
	],
	optimization: {
		splitChunks: {
			name: "vendor",
			chunks(chunk) {
				return chunk.name !== "background";
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		alias: {
			utils: utilsDir,
		},
		extensions: [".ts", ".tsx", ".js"],
	},
};
