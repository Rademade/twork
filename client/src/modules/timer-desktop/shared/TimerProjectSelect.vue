<template>
  <div class="timer-project-select">
    <v-layout timer-project-select__content>
      <v-flex timer-project-select__input>
        <v-autocomplete
          :items="projects"
          v-model="project"
          item-text="name"
          item-value="id"
          auto
          :clearable="true"
          placeholder="No project"
          @input="emmitProjectChanged">
        </v-autocomplete>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: 'TimerProjectSelect',
    props: {
      initialProject: {
        type: Number
      }
    },
    data: function() {
      return {
        project: this.initialProject,
      }
    },
    computed: {
      ...mapGetters({
        projects: "projects/projects"
      })
    },
    methods: {
      emmitProjectChanged() {
        this.$emit('projectChanged', this.project)
      }
    }
  }
</script>
