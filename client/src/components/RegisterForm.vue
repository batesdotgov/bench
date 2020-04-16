<template>
  <div class="login-page">
    <div class="http-error" v-if="submitError">{{ submitError }}</div>
    <div class="card">
      <div class="form-container">
        <form novalidate>
          <div class="form-group" :class="{ 'form-input--error': showError($v.form.username.$error) }">
            <label for="username">Username</label>
            <input id="fname" v-model="$v.form.username.$model" type="text" />
            <div class="input-error--wrapper">
              <span v-if="submitted && !$v.form.username.required">this field is required.</span>
            </div>
          </div>
          <div class="form-group" :class="{ 'form-input--error': showError($v.form.password.$error) }">
            <label for="password">Password</label>
            <input type="password" v-model.trim="$v.form.password.$model" />
            <div class="input-error--wrapper">
              <span v-if="submitted && !$v.form.password.required">this field is required.</span>
              <span v-if="submitted && !$v.form.password.minLength">Password must be at least 8 characters</span>
            </div>
          </div>
          <div class="form-group" :class="{ 'form-input--error': showError($v.form.confirmPassword.$error) }">
            <label for="password">Confirm Password</label>
            <input type="password" v-model.trim="$v.form.confirmPassword.$model" />
            <div class="input-error--wrapper">
              <span v-if="submitted && !$v.form.confirmPassword.required">this field is required.</span>
              <span v-if="submitted && !$v.form.confirmPassword.minLength">Password must be at least 8 characters</span>
              <span v-if="passworMatchError">Password must match</span>
            </div>
          </div>
          <button type="submit" @click.prevent="handleSubmit">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: "RegisterForm",
      submitted: false,
      submitError: null,
      form: {
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    passworMatchError() {
      return this.submitted && !this.$v.form.confirmPassword.sameAsPassword;
    },
  },
  validations: {
    form: {
      username: { required: required },
      password: { required: required, minLength: minLength(8) },
      confirmPassword: {
        required: required,
        minLength: minLength(8),
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.$v.form.$touch();
      !this.$v.form.$invalid && this.register();
    },
    async register() {
      this.$store
        .dispatch("auth/register", this.form)
        .then(() => this.$router.push("/"))
        .catch((err) => this.handleLoginError(err));
    },
    showError(hasError) {
      return this.$v.form.$dirty && this.submitted && hasError;
    },
    handleLoginError(err) {
      this.submitError = err || "There was an error logging in";
    },
  },
};
</script>

<style lang="scss">
.form-input--error {
  label {
    color: red;
  }

  input {
    color: red;
    border: 1px solid red;
  }

  .input-error--wrapper {
    color: red;
  }
}
</style>
