<template>
  <div class="bench-item-form">
    <div class="http-error" v-if="submitError">{{ submitError }}</div>
    <div class="card">
      <div class="form-container">
        <form novalidate>
          <div class="form-group" :class="{ 'form-input--error': showError($v.form.title.$error) }">
            <label for="title">Title</label>
            <input autocomplete="off" id="name" v-model="$v.form.title.$model" type="text" />
            <div class="input-error--wrapper">
              <span v-if="submitted && !$v.form.title.required">Title is required.</span>
            </div>
          </div>
          <div class="form-group" :class="{ 'form-input--error': showError($v.form.description.$error) }">
            <label for="description">Description</label>
            <textarea type="password" v-model="$v.form.description.$model" />
            <div class="input-error--wrapper">
              <span v-if="submitted && !$v.form.description.required">Description is required.</span>
            </div>
          </div>

          <div class="form-group" :class="{ 'form-input--error': showError($v.form.points.$error) }">
            <label for="points">Points</label>
            <input autocomplete="off" id="name" v-model="$v.form.points.$model" type="text" />
            <div class="input-error--wrapper">
              <span v-if="submitted && !$v.form.points.required">Points is required.</span>
            </div>
          </div>

          <button type="submit" @click.prevent="handleSubmit">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      name: "Bench",
      submitted: false,
      submitError: null,
      form: {
        title: "",
        description: "",
        points: "",
      },
    };
  },
  validations: {
    form: {
      title: { required },
      description: { required },
      points: { required },
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
.bench-item-form {
  width: 600px;
  margin: 0 auto;
}
</style>
