<template>
  <div>
    <ProjectsFilter />

    <div class="projects-list">
      <div class="projects-list-table">
        <div class="projects-list-table__row">
          <div class="projects-list-table__item projects-list-table__item--name">
            <span class="projects-list-table__title">Name</span>
          </div>
          <div class="projects-list-table__item projects-list-table__item--status">
            <span class="projects-list-table__title">Status</span>
          </div>
          <div class="projects-list-table__item projects-list-table__item--team">
            <span class="projects-list-table__title">Team</span>
          </div>
          <div class="projects-list-table__item projects-list-table__item--actions">
            <span class="projects-list-table__title">Actions</span>
          </div>
        </div>

        <div class="projects-list-table__content">
          <ProjectsItem
            :key="index"
            :project="project"
            v-for="(project, index) in projects"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import ProjectsItem from './ProjectsItem'
  import ProjectsFilter from './ProjectsFilter'

  export default {
    name: 'ProjectsList',
    components: {
      ProjectsItem,
      ProjectsFilter
    },
    computed: {
      ...mapGetters({
        'projects': 'projects/projects'
      })
    }
  }
</script>

<style lang="postcss" scoped>
  
  .projects-list {
    width: 100%;
  }
  
  .projects-list-table {
    display: block;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(128,128,128,0.2);
  }

  .projects-list-table__row {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 2px solid #e6e6e6;
  }
  
  .projects-list-table__content {
    display: block;
    width: 100%;
  }

  .projects-list-table__title {
    font-size: 14px;
    line-height: 16px;
    color: #929292;
    font-weight: normal;
    text-transform: uppercase;
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
    justify-content: flex-end;
  }
  
</style>
