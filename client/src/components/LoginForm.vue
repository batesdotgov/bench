<template>
  <div class="login-page">
    <div class="http-error" v-if="submitError">{{ submitError }}</div>
    <div class="card">
      <div class="form-container">
        <form novalidate>
          <div class="form-group" :class="{ 'form-input--error': showError($v.form.username.$error) }">
            <label for="username">Username</label>
            <input autocomplete="off" id="name" v-model="$v.form.username.$model" type="text" />
            <div class="input-error--wrapper">
              <span v-if="submitted && !$v.form.username.required">this field is required.</span>
            </div>
          </div>
          <div class="form-group" :class="{ 'form-input--error': showError($v.form.password.$error) }">
            <label for="password">Password</label>
            <input type="password" v-model="$v.form.password.$model" />
            <div class="input-error--wrapper">
              <span v-if="submitted && !$v.form.password.required">this field is required.</span>
              <span v-if="submitted && !$v.form.password.minLength">Password must be at least 8 characters</span>
            </div>
          </div>
          <button type="submit" @click.prevent="handleSubmit">Login</button>
        </form>
      </div>
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
      submitError: null,
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
    showError(hasError) {
      return this.$v.form.$dirty && this.submitted && hasError;
    },
    handleSubmit() {
      this.submitted = true;
      this.$v.form.$touch();
      !this.$v.form.$invalid && this.login();
    },
    async login() {
      this.$store
        .dispatch("auth/login", this.form)
        .then(() => this.$router.push("/"))
        .catch((err) => this.handleLoginError(err));
    },

    handleLoginError(err) {
      this.submitError = err || "There was an error logging in";
    },
  },
};
</script>

<style lang="scss">
.login-page {
  width: 400px;
  margin: 0 auto;
}
.form-container {
  padding: 20px;
}

.http-error {
  text-align: center;
  padding: 10px;
}
</style>
