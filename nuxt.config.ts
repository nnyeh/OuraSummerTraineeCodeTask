// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/google-fonts", {
        families: {
          "Roboto+Mono": [400, 700]
        }
      }
    ]
  ],
  typescript: {
    shim: false
  }
})
