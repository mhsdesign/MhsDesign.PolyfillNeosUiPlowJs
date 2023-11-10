
const esbuild = require("esbuild");

esbuild.build({
    bundle: true,
    minify: true,
    sourcemap: "linked",
    entryPoints: {
        'Plugin': "src/index.js"
    },
    outdir: "../Public"
})