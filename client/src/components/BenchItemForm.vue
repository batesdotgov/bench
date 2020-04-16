<template>
  <div class="bench-item-form" v-if="!fetchingDetails && !loadingItem">
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

          <div class="form-group">
            <label for="">Types</label>
            <div class="location-item" v-for="t of types" v-bind:key="t.id">
              <div class="small" :class="{ selected: t.id === selectedType }" @click="setType(t.id)">
                {{ t.type }}
              </div>
              <div v-if="t.id === selectedType">selected</div>
            </div>
          </div>

          <div class="form-group">
            <label for="">Locations</label>
            <div class="location-item" v-for="l of locations" v-bind:key="l.id">
              <div class="small" :class="{ selected: l.id === selectedLocation }" @click="setLocation(l.id)">
                {{ l.name }}
              </div>
              <div v-if="l.id === selectedLocation">selected</div>
            </div>
          </div>

          <div style="color:red; padding: 5px" v-if="submitted && !selectedLocation">
            Please select a location
          </div>

          <div style="color:red; padding: 5px" v-if="submitted && !selectedType">
            Please select a type
          </div>
          <button type="submit" @click.prevent="handleSubmit">{{ editing ? "Update" : "Create" }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import { BASE_URL } from "@/store/helpers";
export default {
  created() {
    this.fetchTypesAndLocations();
    if (this.$route.params.id) {
      this.loadingItem = true;
      this.editing = true;
      this.fetchEdit(this.$route.params.id);
    }
  },
  data() {
    return {
      loadingItem: false,
      editing: false,
      fetchingDetails: true,
      name: "Bench",
      submitted: false,
      submitError: null,
      form: {
        title: "",
        description: "",
        points: "",
      },
      types: [],
      locations: [],
      selectedType: null,
      selectedLocation: null,
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
    fetchEdit(id) {
      axios({ url: `${BASE_URL}/bench-items/${id}`, method: "GET" })
        .then((res) => {
          this.loadingItem = false;
          this.form = { ...res.data };
          this.selectedType = res.data.commitmentTypeId;
          this.selectedLocation = res.data.locationId;
        })
        .catch((err) => console.log(err));
    },
    resetForm() {
      this.form.title = "";
      this.form.description = "";
      this.form.points = "";
      this.selectedType = null;
      this.selectedLocation = null;
      this.submitted = false;
      this.submitError = null;
    },
    setType(id) {
      if (id === this.selectedType) {
        return (this.selectedType = null);
      }
      this.selectedType = id;
    },

    setLocation(id) {
      if (id === this.selectedLocation) {
        return (this.selectedLocation = null);
      }
      this.selectedLocation = id;
    },
    handleSubmit() {
      this.submitted = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid && !this.editing) {
        this.createBenchItem();
      } else {
        this.updateBenchItem();
      }
    },
    async updateBenchItem() {
      const data = {
        ...this.form,
        locationId: this.selectedLocation,
        commitmentTypeId: this.selectedType,
      };

      this.$store
        .dispatch("bench/update", data)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => this.handleError(err));
    },

    async createBenchItem() {
      const data = {
        ...this.form,
        locationId: this.selectedLocation,
        commitmentTypeId: this.selectedType,
      };

      this.$store
        .dispatch("bench/new", data)
        .then(() => {
          this.resetForm();
        })
        .catch((err) => this.handleError(err));
    },

    handleError(err) {
      this.submitError = err || "There was an error creating item";
    },

    fetchTypesAndLocations() {
      axios({ url: `${BASE_URL}/bench-items/types-and-locations`, method: "GET" })
        .then((res) => {
          this.fetchingDetails = false;
          this.types = res.data.types;
          this.locations = res.data.locations;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.bench-item-form {
  width: 600px;
  margin: 0 auto;
}

.small {
  opacity: 0.8;
  user-select: none;
  font-weight: 300;
  width: 100%;
  padding: 5px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.selected {
  opacity: 1;
  text-decoration: underline;
}

.location-item {
  display: flex;
}
</style>
