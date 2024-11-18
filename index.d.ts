declare module "nuxt/schema" {
  interface RuntimeConfig {
    jwtSecretKey: string;
    environment: string;
  }
  interface PublicRuntimeConfig {}
}

declare module "#app" {
  interface NuxtApp {
    $loading: AppLoading;
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {};
