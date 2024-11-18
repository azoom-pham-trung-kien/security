<script setup lang="ts">
import { routesNames } from "@typed-router";
import { LoginFormSchema } from "@/schema";
import { toast } from "vue3-toastify";

const loading = ref(false);

const form = useForm({
  initialValues: {
    email: "",
    password: "",
    remember: 0,
  },
  validationSchema: toTypedSchema(LoginFormSchema),
});

const handleSubmit = async () => {
  const { valid } = await form.validate();

  if (!valid) return;

  loading.value = true;
  const response = await $fetch("/api/login", {
    method: "post",
    body: form.values,
    onResponseError({ response }) {
      const { message = "" } = response._data || {};
      toast.error(message || "Something went wrong!");
    },
  }).catch(() => false);
  loading.value = false;

  if (!response) {
    return;
  }

  await navigateTo({
    name: routesNames.user,
  });
  toast.success("Log In Successful!");
};

const loginWithGoogle = async () => {
  loading.value = true;
  const url = await $fetch("/api/auth0/google");
  loading.value = false;

  if (!url) {
    return;
  }

  window.location.href = url;
};
</script>

<template>
  <div class="login-container">
    <h2 class="title">Log In</h2>
    <div class="form">
      <vee-field v-slot="{ field, errors }" name="email">
        <v-text-field
          class="input"
          type="email"
          placeholder="Email"
          :error-messages="errors"
          v-bind="field"
        />
      </vee-field>
      <vee-field v-slot="{ field, errors }" name="password">
        <v-text-field
          class="input"
          type="password"
          :error-messages="errors"
          v-bind="field"
          placeholder="Password"
        />
      </vee-field>
      <vee-field
        v-slot="{ componentField, errors }"
        type="checkbox"
        name="remember"
      >
        <v-checkbox
          :error-messages="errors"
          color="primary"
          :true-value="1"
          :false-value="0"
          v-bind="componentField"
          label="Remember me"
        />
      </vee-field>
      <v-btn
        @click="handleSubmit"
        :loading="loading"
        size="large"
        color="primary"
        class="button"
        type="submit"
      >
        Log In
      </v-btn>
      <v-btn @click="loginWithGoogle">Login with Google</v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  > .title {
    text-align: center;
    margin-bottom: 1rem;
  }
  > .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form > .button {
    font-weight: bold;
    transition: opacity 0.3s ease;
  }

  .form > .button:hover {
    opacity: 0.8;
  }
}
</style>
