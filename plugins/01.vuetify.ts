import { createVuetify } from "vuetify";
import type { ThemeDefinition, IconOptions } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { md } from "vuetify/iconsets/md";

const defaultTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#006787",
    background: "#F5F5F5",
    "success-darken": "#007F5F",
    error: "#CD2B21",
    "on-primary": "#FFFFFF",
    "cyan-blue": "#EBF3F5",
    "on-background": "#23221E",
    border: "#D9D9D9",
    tab: "#E5E5E5",
    "border-secondary": "#F1F4FA",
    text: "#23221E",
    "on-text": "#666666",
    "text-placeholder": "#8C8F8C",
    "primary-light": "#E2EAED",
    "primary-lighten": "#0077B5",
    "background-disabled": "#E4E5E4",
    warning: "#ED9D25",
    "in-warning": "#E99E00",
    active: "#CFF2FD",
    "on-active": "#0EB3E8",
    "success-lighten": "#A5FFA2",
    black: "#000000",
    white: "#FFFFFF",
    success: "#20C08F",
    orange: "#E4675F",
    secondary: "#A1BCC4",
    "gray-scale-1": "#CCCCCC",
    "gray-scale-2": "#F3F3F3",
    "gray-scale-4": "#E5E5E5",
    "error-lighten": "#D03F4B",
    "orange-1": "#D97009",
    "dark-olive": "#74700F",
    "snow-pink": "#FFF8F7",
  },
  variables: {
    "font-bold": "700",
    "font-semibold": "500",
    "font-normal": "400",
    "radius-small": "2px",
    "radius-base": "4px",
    "radius-medium": "6px",
    "radius-large": "8px",
  },
};

const iconOptions: IconOptions = {
  defaultSet: "mdi",
  aliases,
  sets: {
    mdi,
    md,
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: iconOptions,
    theme: {
      defaultTheme: "defaultTheme",
      themes: {
        defaultTheme,
      },
    },
    defaults: {
      VCheckbox: {
        hideDetails: "auto",
        color: "primary",
        density: "compact",
      },
      VRadio: {
        hideDetails: "auto",
        color: "primary",
        density: "compact",
      },
      VRadioGroup: {
        hideDetails: "auto",
        color: "primary",
        density: "compact",
      },
      VSelect: {
        hideDetails: "auto",
        color: "primary",
        density: "compact",
        variant: "outlined",
        menuIcon: "mdi-chevron-down",
      },
      VAutocomplete: {
        hideDetails: "auto",
        color: "primary",
        density: "compact",
        variant: "outlined",
      },
      VTextarea: {
        hideDetails: "auto",
        color: "primary",
        variant: "outlined",
      },
      VTextField: {
        hideDetails: "auto",
        color: "primary",
        density: "comfortable",
        variant: "outlined",
      },
      VList: {
        bgColor: "#FFFFFF",
        color: "primary",
      },
      VPagination: {
        activeColor: "#FFFFFF",
        size: "30px",
        color: "primary",
      },
      VBreadcrumbs: {
        color: "primary",
      },
      VTabs: {
        hideSlider: true,
      },
      VTab: {
        variant: "flat",
        width: 140,
      },
    },
    display: {
      mobileBreakpoint: "lg",
      thresholds: {
        xs: 375,
        md: 768,
        lg: 1024,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
