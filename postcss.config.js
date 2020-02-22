module.exports = {
  parser: "postcss-scss",
  plugins: [
    require("precss"),
    require("postcss-preset-env")({
      stage: 0
    }),
    require("cssnano")({
      preset: "default"
    })
  ]
};
