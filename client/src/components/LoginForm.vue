<template>
  <div class="login-page">
    <div class="card">
      <form novalidate>
        <div class="form-input" :class="{ 'form-input--error': $v.form.username.$error }">
          <label for="username">Username</label>
          <input id="fname" v-model="$v.form.username.$model" type="text" />
          <div class="input-error--wrapper">
            <span v-if="submitted && !$v.form.username.required">this field is required.</span>
          </div>
        </div>
        <div class="form-input" :class="{ 'form-input--error': $v.form.password.$error }">
          <label for="password">Password</label>
          <input type="password" v-model="$v.form.password.$model" />
          <div class="input-error--wrapper">
            <span v-if="submitted && !$v.form.password.required">this field is required.</span>
            <span v-if="submitted && !$v.form.password.minLength">Password must be at least 8 characters</span>
          </div>
        </div>
      </form>
      <button type="submit" @click.prevent="handleSubmit">Login</button>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      name: "Bench",
      submitted: false,
      form: {
        username: "",
        password: "",
      },
    };
  },
  validations: {
    form: {
      username: { required: required },
      password: { required: required, minLength: minLength(8) },
    },
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.$v.form.$touch();
      !this.$v.form.$invalid && this.login();
    },
    async login() {
      this.$store
        .dispatch("login")
        .then(() => this.$router.push("/"))
        .catch((err) => this.handleLoginError(err));
    },

    handleLoginError(err) {
      console.log(err);
    },
  },
};
</script>

<style lang="scss"></style>
