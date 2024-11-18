// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "vue3-toastify/dist/index.css",
    "@/assets/scss/vuetify.override.scss",
    "vuetify/lib/styles/main.sass",
  ],
  runtimeConfig: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    environment: process.env.ENVIRONMENT,
  },
  imports: {
    dirs: ["stores", "utils", "constants", "composables", "helper"],
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
    "vuetify-nuxt-module",
    "nuxt-typed-router",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '@/assets/scss/mixins.scss' as *;",
        },
      },
    },
  },
});
