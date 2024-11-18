<script setup lang="ts">
import { routesNames } from "@typed-router";
import { FESignupFormSchema } from "@/schema";
import { toast } from "vue3-toastify";

const loading = ref(false);

const form = useForm({
  initialValues: {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    remember: 0,
  },
  validationSchema: toTypedSchema(FESignupFormSchema),
});

const handleSubmit = async () => {
  const { valid } = await form.validate();

  if (!valid) return;

  loading.value = true;
  const response = await $fetch("/api/signup", {
    method: "post",
    body: form.values,
  });
  loading.value = false;

  if (!response) {
    return;
  }

  await navigateTo({
    name: routesNames.user,
  });
  toast.success("Signup Successful!");
};
</script>

<template>
  <div class="signup-container">
    <h2 class="title">Sign Up</h2>
    <div class="form">
      <vee-field v-slot="{ field, errors }" name="name">
        <v-text-field
          class="input"
          v-bind="field"
          :error-messages="errors"
          placeholder="Name"
        />
      </vee-field>
      <vee-field v-slot="{ field, errors }" name="email">
        <v-text-field
          v-bind="field"
          :error-messages="errors"
          class="input"
          placeholder="Email"
        />
      </vee-field>
      <vee-field v-slot="{ field, errors }" name="password">
        <v-text-field
          v-bind="field"
          :error-messages="errors"
          class="input"
          type="password"
          placeholder="Password"
        />
      </vee-field>
      <vee-field v-slot="{ field, errors }" name="passwordConfirm">
        <v-text-field
          v-bind="field"
          :error-messages="errors"
          class="input"
          type="password"
          placeholder="Password confirm"
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
        size="large"
        :loading="loading"
        color="primary"
        class="button"
        type="submit"
      >
        Sign Up
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signup-container {
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
