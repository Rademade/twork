<template>
  <v-layout row>
    <v-flex xs12>
      <v-toolbar flat color="white">
        <v-flex xs6 class="pt-3">
          <v-toolbar-title>Projects</v-toolbar-title>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs6 md3 justiify-end>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            class=""
          ></v-text-field>
        </v-flex>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="projects"
        :search="search"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <!-- <td class="text-xs-right">{{ props.item.status }}</td>
          <td class="text-xs-right">{{ props.item.team }}</td> -->
          <td class="layout justify-end">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="red darken-4" dark fixed bottom right fab>
          <v-icon>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click.native="close">Cancel</v-btn>
            <v-btn color="primary" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :bottom="true"
      :timeout="3000"
    >
      {{ snackbarText }}
      <v-btn
        color="red darken-4"
        flat
        @click="snackbar=false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
  import  { mapActions, mapGetters } from "vuex";
  export default {
    data: () => ({
      dialog: false,
      snackbar: false,
      snackbarText: '',
      search: '',
      headers: [
        { text: 'Name', align: 'left', sortable: true, value: 'name'},
        // { text: 'Status', value: 'status', sortable: true },
        // { text: 'Team', value: 'team', sortable: false },
        { text: 'Actions', align: 'right', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: { name: '' },
      defaultItem: { name: '' }
    }),
    computed: {
      ...mapGetters({
        projects: "projects/projects"
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'Create new project' : 'Edit project'
      }
    },
    methods: {
      ...mapActions({
        updateProject: 'projects/updateProject',
        deleteProject: 'projects/deleteProject',
        createProject: 'projects/createProject'
      }),

      editItem (item) {
        this.editedIndex = this.projects.findIndex(project => item.id == project.id);
        this.editedItem = { ...item }
        this.dialog = true
      },

      deleteItem (item) {
        confirm('Are you sure you want to delete this item?') && this.deleteProject(item.id);
      },
      close() {
        this.dialog = false;
        this.editedItem = this.defaultItem;
        this.snackbar = true;
      },
      save () {
        if (this.editedIndex > -1) {
          this.snackbarText = 'Project updated'
          this.updateProject(this.editedItem);
        } else {
          this.snackbarText = 'Project created'
          this.createProject(this.editedItem);
        }
        this.close();
      }
    }
  }
</script>
