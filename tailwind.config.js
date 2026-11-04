module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#c2410c", "primary-content": "#ffffff",
          secondary: "#1c1917", accent: "#0f766e",
          neutral: "#1c1917", "base-100": "#fafaf9", "base-200": "#f0eeeb", "base-300": "#e0ddd8",
          "base-content": "#1c1917",
        },
        dark: {
          primary: "#fb923c", "primary-content": "#1c1917",
          secondary: "#e7e5e4", accent: "#2dd4bf",
          neutral: "#292524", "base-100": "#161412", "base-200": "#1f1c19", "base-300": "#2c2824",
          "base-content": "#e7e5e4",
        },
      },
    ],
  },
};
