<template>
  <div class="projects-list-table__row">
    <div class="projects-list-table__item projects-list-table__item--name">
      <span class="projects-list-table__value">{{ clonedProject.name }}</span>
    </div>
    <div class="projects-list-table__item projects-list-table__item--status">
      <span class="projects-list-table__value">25h</span>
    </div>
    <div class="projects-list-table__item projects-list-table__item--team">
      <span class="projects-list-table__value">Team 1</span>
    </div>
    <div class="projects-list-table__item projects-list-table__item--actions">
      <button
        v-on:click="toggleProjectModal"
        class="projects-list-table__btn"
        type="button"
      >
        E
      </button>

      <button
        v-on:click="destroy(clonedProject.id)"
        class="projects-list-table__btn"
        type="button"
      >
        D
      </button>

      <ProjectModal
        :initialProject="clonedProject"
        :is-visible="showModal"
        v-on:visibilityChanged="toggleProjectModal"
      />
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import ProjectModal from "./../shared/ProjectModal";
  import Project from "./../Project";
  import Close from "@/assets/close.svg";
  import Edit from "@/assets/edit.svg"

  export default {
    props: {
      project: Project
    },
    name: 'ProjectsItem',
    components: {
      ProjectModal
    },
    data() {
      return {
        clonedProject: this.project.clone(),
        showModal: false
      }
    },
    watch: {
      project() {
        this.clonedProject = this.project.clone()
      }
    },
    methods: {
      ...mapActions({
        destroy: 'projects/destroy'
      }),
      toggleProjectModal() {
        this.showModal = !this.showModal;
      }
    }
  }
</script>

<style lang="postcss" scoped>

  .projects-list-table__row {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #e6e6e6;
  }

  .projects-list-table__item {
    padding: 15px;
    text-align: left;
    box-sizing: border-box;
  }

  .projects-list-table__item--name {
    width: 40%;
  }

  .projects-list-table__item--status {
    width: 20%;
  }

  .projects-list-table__item--team {
    width: 30%;
  }

  .projects-list-table__item--actions {
    display: flex;
    width: 95px;
    padding: 0 10px 0 0;
    justify-content: flex-end;
  }

  .projects-list-table__value {
    font-size: 14px;
    line-height: 16px;
    color: #333;
  }

  .projects-list-table__btn {
    display: block;
    margin-left: 20px;
    padding: 10px 5px;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    &:hover {
      .projects-list-table__icon {
        fill: rgb(31, 200, 129);
      }
    }
  }

  .projects-list-table__icon {
    width: 16px;
    height: 16px;
    fill: #929292;
    transition: fill .3s ease;
  }


</style>
