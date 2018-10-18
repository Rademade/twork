<template>
  <div class="popup__wrapper" v-if="visible" @keydown.esc="closeModal()">
    <div class="popup__layout">
      <div class="popup__data" v-click-outside="closeModal">
        <div class="popup__header">
          <div class="popup__title">{{ this.isNewProject ? 'Create' : 'Edit' }} project</div>
          <button class="popup__close" v-on:click="closeModal" type="button">
            <svg>
              <use xlink:href="#close"></use>
            </svg>
          </button>
        </div>

        <div class="popup__content">
          <input
            v-model="projectName"
            class="popup__input"
            placeholder="Project name"
            name="project-name"
            id="project-name"
            type="text"
          />
        </div>

        <div class="popup__btn-box">
          <button
            v-on:click="submitProject"
            type="button"
            class="popup__btn">
            Add project
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Project from './../Project'
  import CloseIcon from "@/assets/close.svg";

  export default {
    props:{
      initialProject: {
        type: Object,
        default() { return {} }
      },
      isVisible: {
        type: Boolean,
        default: false
      },
      clearAfterSubmit: {
        type: Boolean,
        default: false
      }
    },
    name: 'ProjectModal',
    data() {
      return {
        projectName: this.initialProject.name,
        projectId: this.initialProject.id,
        visible: this.isVisible
      }
    },
    watch: {
      isVisible() {
        this.visible = this.isVisible;
      },
      initialProject() {
        this.projectName = this.initialProject.name;
        this.projectId = this.initialProject.id
      }
    },
    methods: {
      async submitProject() {
        if (this.isNewProject) {
          await this.$store.dispatch('projects/create', {
            name: this.projectName
          });
        } else {
          await this.$store.dispatch('projects/update', {
            id: this.projectId,
            newName: this.projectName
          })
        }

        if (this.clearAfterSubmit) {
          this.projectName = '';
          this.projectId = '';
        }

        this.$emit('visibilityChanged');
      },
      closeModal() {
        this.$emit('visibilityChanged');
      }
    },
    computed: {
      isNewProject() {
        return _.isEmpty(this.initialProject);
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .popup__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: table;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
    z-index: 999;
  }

  .popup__layout {
    display: table-cell;
    vertical-align: middle;
  }

  .popup__data {
    width: 500px;
    margin: 0 auto;
    padding: 25px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    box-sizing: border-box;
  }

  .popup__header {
    position: relative;
    margin-bottom: 30px;
    padding-right: 40px;
  }
  
  .popup__title {
    font-size: 24px;
    line-height: 40px;
    color: #333;
    text-align: left;
  }
  
  .popup__close {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 15px;
      height: 15px;
      fill: #333;
    }
  }

  .popup__content {
    margin-bottom: 30px;
  }
  
  .popup__input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ECECEC;
    
    &:focus {
      outline: none;
    }
  }

  .popup__btn-box {
    text-align: right;
  }
  
  .popup__btn {
    position: relative;
    display: inline-block;
    min-width: 125px;
    padding: 10px;
    font-size: 16px;
    line-height: 20px;
    color: #fff;
    border: 2px solid #2ec783;
    background-color: #2ec783;
    white-space: nowrap;
    cursor: pointer;
    outline: 0;
    transition: color .3s ease-in-out,background .3s ease-in-out;
    box-sizing: border-box;
    -webkit-appearance: none;
    user-select: none;
  
    &:hover {
      color: #2ec783;
      background-color: transparent;
    }
  }
</style>
