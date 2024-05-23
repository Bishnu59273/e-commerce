export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/google-fonts"],
  googleFonts: {
    display: "swap",
    prefetch: true,
    preconnect: true,
    preload: true,
    useStylesheet: true,
    families: {
      Poppins: [200, 300, 400, 500, 600, 700, 800, 900],
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  css: ["~/assets/scss/main.scss", "~/assets/css/style.css"],

  runtimeConfig: {
    public: {
      // ADDRESS: "1771 W. Edgar Road,Linden, NJ 07036",
      // PHONE: "+1 732-394-1115",
      // EMAIL: "info@easylinkamerica.com",
    },
  },
});
