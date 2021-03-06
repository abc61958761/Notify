<template>
  <div>
    <title-bar>Project Information</title-bar>
    <div class="d-flex align-center table-action">
      <v-btn outlined color="Genoa" small @click="openAddProjectModal = true">
        <v-icon left>
          mdi-plus-circle-outline
        </v-icon>
        Project</v-btn
      >
      <v-spacer></v-spacer>
      <span class="mr-2 search-text">篩選</span>
      <v-text-field
        v-model="search"
        single-line
        hide-details
        outlined
        style="max-width:150px"
      ></v-text-field>
    </div>

    <v-data-table
      :headers="projectHeaders"
      :items="projectData"
      :search="search"
    >
      <template v-slot:item.lead>
        <v-icon small>
          mdi-close-circle
        </v-icon>
      </template>
      <template v-slot:item.edit>
        <v-icon small @click="openEditProjectModal = true">
          mdi-square-edit-outline
        </v-icon>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-icon small @click="deleteProject(item.id)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <title-bar>Member List</title-bar>
    <div class="d-flex align-center table-action">
      <v-spacer></v-spacer>
      <span class="mr-2 search-text">篩選</span>
      <v-text-field
        v-model="search"
        single-line
        hide-details
        outlined
        style="max-width:150px"
      ></v-text-field>
    </div>
    <v-data-table
      :headers="memberHeaders"
      :items="memberData"
      :search="search"
    ></v-data-table>

    <add-project-modal
      :openModal="openAddProjectModal"
      @closeModal="openAddProjectModal = false"
    ></add-project-modal>
    <edit-project-modal
      :openModal="openEditProjectModal"
      @closeModal="openEditProjectModal = false"
    ></edit-project-modal>
    <title-alert-dialog
      :openDialog="openDeleteDialog"
      @closeDialog="openDeleteDialog = false"
    >
      <template slot="title-icon">mdi-alert</template>
      <template slot="title-text">Delete</template>
      <template slot="content"
        >Are you sure to delete {{ deleteProjectId }} ?</template
      >
      <template slot="action">
        <v-btn
          depressed
          color="DarkGray White--text"
          @click="openDeleteDialog = false"
          >取消</v-btn
        >
        <v-btn
          depressed
          color="FountainBlue White--text"
          @click="
            openDeleteDialog = false;
            openConfirmDeleteDialog = true;
          "
          >確定</v-btn
        >
      </template>
    </title-alert-dialog>
    <alert-dialog
      :openDialog="openConfirmDeleteDialog"
      @closeDialog="openConfirmDeleteDialog = false"
    >
      <template slot="content"
        >The project you want to delete is in service.</template
      >
      <template slot="action">
        <v-btn
          depressed
          color="FountainBlue White--text"
          @click="openConfirmDeleteDialog = false"
          >確定</v-btn
        >
      </template>
    </alert-dialog>
  </div>
</template>
<script>
  import TitleBar from "../components/TitleBar";
  import AddProjectModal from "../components/modals/AddProject";
  import EditProjectModal from "../components/modals/EditProject";
  import TitleAlertDialog from "../components/dialogs/TitleAlertDialog";
  import AlertDialog from "../components/dialogs/AlertDialog";

  export default {
    data: () => {
      return {
        openAddProjectModal: false,
        openEditProjectModal: false,
        openDeleteDialog: false,
        openConfirmDeleteDialog: false,
        deleteProjectId: null,
        search: "",
        projectHeaders: [
          {
            text: "Project. ID",
            align: "start",
            value: "id",
          },
          { text: "Proj. Name", filterable: false, value: "projectName" },
          { text: "Leader", value: "leader" },
          { text: "Desc.", value: "desc" },
          { text: "#Crew", value: "crew" },
          { text: "Client", value: "client" },
          { text: "Lead", value: "lead" },
          { text: "Creator", value: "creator" },
          { text: "Edit", value: "edit" },
          { text: "Delete", value: "delete" },
        ],
        memberHeaders: [
          { text: "User Name", value: "userName" },
          { text: "Nickname", value: "nickname" },
          { text: "Leader", value: "leader" },
          { text: "Org", value: "org" },
        ],
        projectData: [
          {
            id: "1",
            projectName: "projectName1",
            leader: "leader1",
            desc: "desc111",
            crew: "crew1",
            client: "client1%",
            creator: "creator1%",
          },
        ],
        memberData: [
          {
            userName: "userName1",
            nickname: "nickname1",
            leader: "leader1",
            org: "org1",
          },
        ],
      };
    },
    components: {
      "title-bar": TitleBar,
      "add-project-modal": AddProjectModal,
      "edit-project-modal": EditProjectModal,
      "title-alert-dialog": TitleAlertDialog,
      "alert-dialog": AlertDialog,
    },
    methods: {
      deleteProject(id) {
        this.deleteProjectId = id;
        this.openDeleteDialog = true;
      },
    },
  };
</script>
<style lang="scss">
  .v-text-field.v-text-field--outlined {
    .v-label {
      top: unset;
    }

    background: var(--v-White-base);
    .v-input__control .v-input__slot {
      min-height: 24px;
    }
  }
</style>
