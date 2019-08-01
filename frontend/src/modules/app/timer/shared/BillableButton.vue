<template>
  <div>
    <v-btn  v-if="billableState" flat icon color="teal" v-on:click="unbill()">
      <v-icon>fas fa-dollar-sign</v-icon>
    </v-btn>
    <v-btn v-if="!billableState" flat icon color="primary lighten-4" v-on:click="bill()">
      <v-icon>fas fa-dollar-sign</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      initialBillableState: Boolean
    },
    name: 'BillableButton',
    data() {
      return {
        billableState: this.initialBillableState
      }
    },
    watch:{
      initialBillableState() {
        this.billableState = this.initialBillableState;
      }
    },
    methods: {
      bill() {
        this.billableState = true;
        this.$emit('billableChanged', this.billableState);
      },
      unbill() {
         this.billableState = false;
         this.$emit('billableChanged', this.billableState);
      }
    }
  }
</script>
