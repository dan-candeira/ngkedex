/** @type {import('tailwindcss').Config} */
/* © Andy Bell - https://buildexcellentwebsit.es/ */

/* © Andy Bell - https://buildexcellentwebsit.es/ */

const plugin = require("tailwindcss/plugin");
const postcss = require("postcss");
const postcssJs = require("postcss-js");

const clampGenerator = require("./src/styles/css-utils/clamp-generator.js");
const tokensToTailwind = require("./src/styles/css-utils/tokens-to-tailwind.js");

// Raw design tokens
const colorTokens = require("./src/styles/design-tokens/colors.json");
const fontTokens = require("./src/styles/design-tokens/fonts.json");
const spacingTokens = require("./src/styles/design-tokens/spacing.json");
const textSizeTokens = require("./src/styles/design-tokens/text-sizes.json");

// Process design tokens
const colors = tokensToTailwind(colorTokens.items);
const fontFamily = tokensToTailwind(fontTokens.items);
const fontSize = tokensToTailwind(clampGenerator(textSizeTokens.items));
const spacing = tokensToTailwind(clampGenerator(spacingTokens.items));

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		screens: {
			md: "50em",
			lg: "80em",
		},
		colors,
		spacing,
		fontSize,
		fontFamily,
		fontWeight: {
			normal: 400,
			bold: 700,
			black: 800,
		},
		backgroundColor: ({ theme }) => theme("colors"),
		textColor: ({ theme }) => theme("colors"),
	},
	variantOrder: [
		"first",
		"last",
		"odd",
		"even",
		"visited",
		"checked",
		"empty",
		"read-only",
		"group-hover",
		"group-focus",
		"focus-within",
		"hover",
		"focus",
		"focus-visible",
		"active",
		"disabled",
	],
	// Disables Tailwind's reset etc
	corePlugins: {
		preflight: false,
	},
	plugins: [
		// Generates custom property values from tailwind config
		plugin(function ({ addComponents, config }) {
			let result = "";

			const currentConfig = config();

			const groups = [
				{ key: "colors", prefix: "color" },
				{ key: "spacing", prefix: "space" },
				{ key: "fontSize", prefix: "size" },
				{ key: "fontFamily", prefix: "font" },
				{ key: "fontWeight", prefix: "weight" },
			];

			groups.forEach(({ key, prefix }) => {
				const group = currentConfig.theme[key];

				if (!group) {
					return;
				}

				Object.keys(group).forEach((key) => {
					result += `--${prefix}-${key}: ${group[key]};`;
				});
			});

			addComponents({
				":root": postcssJs.objectify(postcss.parse(result)),
			});
		}),

		// Generates custom utility classes
		plugin(function ({ addUtilities, config }) {
			const currentConfig = config();
			const customUtilities = [
				{
					key: "spacing",
					prefix: "flow-space",
					property: "--flow-space",
				},
				{
					key: "colors",
					prefix: "spot-color",
					property: "--spot-color",
				},
				{ key: "fontWeight", prefix: "weight", property: "--weight" },
				{ key: "fontFamily", prefix: "font", property: "--font" },
			];

			customUtilities.forEach(({ key, prefix, property }) => {
				const group = currentConfig.theme[key];

				if (!group) {
					return;
				}

				Object.keys(group).forEach((key) => {
					addUtilities({
						[`.${prefix}-${key}`]: postcssJs.objectify(
							postcss.parse(`${property}: ${group[key]}`)
						),
					});
				});
			});
		}),
	],
};
