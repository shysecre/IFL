const { config } = require("dotenv");

config();

module.exports = {
  packagerConfig: {
    name: "IFL",
    icon: "./public/icons/app.ico",
    asar: true,
  },
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "sekkure",
          name: "IFL",
        },
        authToken: process.env.GITHUB_TOKEN,
        prerelease: false,
        draft: false,
      },
    },
  ],
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      certificateFile: "./cert.pfx",
      certificatePassword: process.env.CERTIFICATE_PASSWORD,
      config: {
        name: "IFL",
        exe: "IFL",
        setupExe: "IFL",
      },
    },
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        devContentSecurityPolicy:
          "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;",
        mainConfig: "./webpack/webpack.main.config.js",
        renderer: {
          config: "./webpack/webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./src/base/index.html",
              js: "./src/base/renderer.ts",
              name: "main_window",
              preload: {
                js: "./src/preload.js",
              },
            },
          ],
        },
      },
    ],
  ],
};
