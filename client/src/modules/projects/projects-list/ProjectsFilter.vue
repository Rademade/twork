<template>
  <div class="projects-filter">
    <label class="projects-filter__label">
      <svg class="projects-filter__icon">
        <use xlink:href="#search"></use>
      </svg>
      <input type="text" class="projects-filter__input" placeholder="Enter project name...">
    </label>
    <button type="button" class="projects-filter__btn">Apply</button>
  </div>
</template>

<script>
  import Search from "@/assets/search.svg"
  export default {
    name: 'ProjectsFilter',
    data() {
      return {
        nameFilter: ''
      }
    }
  }
</script>

<style lang="postcss" scoped>
  
  .projects-filter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    margin-bottom: 40px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(128,128,128,0.2);
    box-sizing: border-box;
  }

  .projects-filter__label {
    position: relative;
    width: 100%;
    padding: 0 20px 0 45px;
    box-sizing: border-box;
  }

  .projects-filter__icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    fill: #929292;
  }
  
  .projects-filter__input {
    width: 100%;
    height: 100%;
    color: #333;
    
    &:focus {
      outline: none;
    }
  }
  
  .projects-filter__btn {
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
