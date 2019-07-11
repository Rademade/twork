<template>
  <form v-on:submit.prevent="submitDescriptionChange" @keydown.esc="rollbackDescriptionChange">
    <v-text-field
      type="text"
      v-model="description"
      placeholder="No description"
      v-on:blur="rollbackDescriptionChange($event)"
      ref="descInput"
    />
  </form>
</template>

<script>
  export default {
    name: "TimerItemDescription",
    props: ["initialDescription"],
    data() {
      return {
        description: this.initialDescription
      }
    },
    methods: {
      submitDescriptionChange() {
        this.$emit("descriptionChanged", this.description);
      },
      rollbackDescriptionChange(event) {
        this.description = this.initialDescription;
        this.$refs.descInput.blur();
      }
    }

  }
</script>