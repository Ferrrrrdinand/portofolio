import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { fernova: { orange: "#ff7138", ink: "#090909" } } } },
  plugins: []
};
export default config;
