<template>
  <div>
    <modal :openModal="openModal"  @closeModal="closeDialog()">
      <template v-slot:title>Add Service</template>
      <template v-slot:content>
        <span class="modal-span-title">* Project</span>
        <v-select
          v-model="project"
          required
          dense
          attach
          outlined
          :items="items"
          :error-messages="projectErrors"
          @change="$v.project.$touch()"
          @blur="$v.project.$touch()"
        >
        </v-select>

        <span class="modal-span-title">Tag</span>
        <v-select
          v-model="tags"
          dense
          chips
          multiple
          attach
          outlined
          :items="items"
        >
          <template v-slot:selection="{ item }">
            <v-chip small class="ma-1" color="HummingBird">
              <span>{{ item }}</span>
            </v-chip>
          </template>
        </v-select>

        <span class="modal-span-title">Service ID</span>
        <v-text-field outlined></v-text-field>

        <span class="modal-span-title">* Owner</span>
        <v-text-field outlined disabled></v-text-field>

        <span class="modal-span-title">* Enabled (Deafult: True)</span>
        <v-select
          v-model="enabled"
          required
          dense
          attach
          outlined
          :items="booleanItems"
          :error-messages="enabledErrors"
          @change="$v.enabled.$touch()"
          @blur="$v.enabled.$touch()"
        >
        </v-select>

        <span class="modal-span-title">* Issue tracker (Default: False)</span>
        <v-select
          v-model="issueTracker"
          required
          dense
          attach
          outlined
          :items="booleanItems"
          :error-messages="issueTrackerErrors"
          @change="$v.issueTracker.$touch()"
          @blur="$v.issueTracker.$touch()"
        >
        </v-select>

        <span class="modal-span-title">Service Description</span>
        <v-textarea outlined auto-grow rows="2"></v-textarea>

        <span class="modal-span-title d-flex align-center">
          * Service type
          <v-tooltip bottom max-width="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                color="FountainBlue"
                class="ml-1"
                v-bind="attrs"
                v-on="on"
                :disabled="!serviceTypeTooltip"
              >
                mdi-information
              </v-icon>
            </template>
            <span v-html="serviceTypeTooltip"></span>
          </v-tooltip>
        </span>

        <v-select
          v-model="serviceType"
          required
          dense
          attach
          outlined
          :items="serviceTypeItems"
          :error-messages="serviceTypeErrors"
          @change="$v.serviceType.$touch()"
          @blur="$v.serviceType.$touch()"
        >
        </v-select>

        <span class="modal-span-title d-flex align-center"
          >Interval start time
          <v-tooltip bottom max-width="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                color="FountainBlue"
                class="ml-1"
                v-bind="attrs"
                v-on="on"
                :disabled="!intervalStartTimeTooltip"
              >
                mdi-information
              </v-icon>
            </template>
            <span>{{ intervalStartTimeTooltip }} </span>
          </v-tooltip>
        </span>
        <datetime-picker style="margin-bottom:14px;"></datetime-picker>

        <span class="modal-span-title d-flex align-center"
          >Interval second
          <v-tooltip bottom max-width="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                color="FountainBlue"
                class="ml-1"
                v-bind="attrs"
                v-on="on"
                :disabled="!intervalSecondTooltip"
              >
                mdi-information
              </v-icon>
            </template>
            <span>{{ intervalSecondTooltip }} </span>
          </v-tooltip>
        </span>
        <v-text-field outlined></v-text-field>

        <span class="modal-span-title d-flex align-center"
          >Message body
          <v-tooltip bottom max-width="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                color="FountainBlue"
                @click="copyMessageBody"
                class="ml-1"
                v-bind="attrs"
                v-on="on"
                :disabled="!messageBodyTooltip"
              >
                mdi-information
              </v-icon>
            </template>
            <span v-html="messageBodyTooltip"></span>
          </v-tooltip>
        </span>
        <v-text-field outlined></v-text-field>
        <span class="modal-span-title">* Channels</span>
        <v-select
          v-model="channels"
          required
          dense
          chips
          multiple
          attach
          outlined
          :items="items"
          :error-messages="channelErrors"
          @change="$v.channels.$touch()"
          @blur="$v.channels.$touch()"
        >
          <template v-slot:selection="{ item }">
            <v-chip small class="ma-1" color="HummingBird">
              <span>{{ item }}</span>
            </v-chip>
          </template>
        </v-select>

        <v-btn
          outlined
          color="FountainBlue White--text"
          @click="openNotifyApiDialog = true"
          class="mb-2"
          >Generate your notify-request sample</v-btn
        >
        <v-btn
          outlined
          color="FountainBlue White--text"
          @click="openNotifyApiDialog = true"
          >Generate your reg-request sample</v-btn
        >
      </template>
      <template v-slot:actions>
        <div class="modal-button-group">
          <v-btn
            depressed
            @click="closeDialog"
            color="DarkGray White--text"
            class="mr-2"
            >取消</v-btn
          >
          <v-btn depressed @click="closeDialog" color="FountainBlue White--text"
            >確定</v-btn
          >
        </div>
      </template>
    </modal>
    <title-alert-dialog
      :openDialog="openNotifyApiDialog"
      @closeDialog="openNotifyApiDialog = false"
    >
      <template slot="title-icon">mdi-alert</template>
      <template slot="title-text">Notify API</template>
      <template slot="content">
        <p>
          "POST
          http://10.62.163.224:7767/api/v1/notify/services/96?message={message}&
          HTTP/1.1"
        </p>
      </template>
      <template slot="action">
        <v-btn
          depressed
          color="DarkGray White--text"
          @click="openNotifyApiDialog = false"
          >取消</v-btn
        >
        <v-btn
          depressed
          color="FountainBlue White--text"
          @click="openNotifyApiDialog = false"
          >確定</v-btn
        >
      </template>
    </title-alert-dialog>
  </div>
</template>
<script>
  import { validationMixin } from "vuelidate";
  import { required } from "vuelidate/lib/validators";

  import TitleAlertDialog from "../dialogs/TitleAlertDialog";
  import DateTimePicker from "../DateTimePicker";
  import Modal from "./Modal";
  import ServiceTypeMapping from "../../assets/type-mapping.json";

  export default {
    mixins: [validationMixin],
    validations: {
      project: { required },
      enabled: { required },
      issueTracker: { required },
      serviceType: { required },
      channels: { required },
    },
    data: () => {
      return {
        openNotifyApiDialog: false,
        project: null,
        tags: [],
        enabled: true,
        issueTracker: false,
        serviceDescription: null,
        intervalStartTime: null,
        intervalSecond: null,
        messageBody: null,
        serviceType: null,
        channels: [],
        booleanItems: [true, false],
        serviceTypeItems: ["delay forward", "dead notice", "direct forward"],
        items: [
          "小廢物",
          "中廢物",
          "大廢物",
          "超級廢物",
          "臭廢物",
          "死廢物",
          "完全廢物",
          "究極廢物",
        ],
      };
    },
    props: ["openModal"],
    computed: {
      intervalStartTimeTooltip() {
        let result = null;
        const { intervalStartTime } = ServiceTypeMapping;
        switch (this.serviceType) {
          case "delay forward":
            result = intervalStartTime["delay forward"];
            break;
          case "dead notice":
            result = intervalStartTime["dead notice"];
            break;
          default:
            break;
        }
        return result;
      },
      intervalSecondTooltip() {
        let result = null;
        const { intervalSecond } = ServiceTypeMapping;
        switch (this.serviceType) {
          case "delay forward":
            result = intervalSecond["delay forward"];
            break;
          case "dead notice":
            result = intervalSecond["dead notice"];
            break;
          default:
            break;
        }
        return result;
      },
      serviceTypeTooltip() {
        let result = null;
        const { serviceType } = ServiceTypeMapping;

        switch (this.serviceType) {
          case "direct forward":
            result = serviceType["direct forward"];
            break;
          case "delay forward":
            result = serviceType["delay forward"];
            break;
          case "dead notice":
            result = serviceType["dead notice"];
            break;
          default:
            break;
        }
        return result;
      },
      messageBodyTooltip() {
        let result = null;
        const { messageBody } = ServiceTypeMapping;

        switch (this.serviceType) {
          case "dead notice":
            result = messageBody["dead notice"];
            break;
          default:
            break;
        }
        return result;
      },
      projectErrors() {
        const errors = [];
        if (!this.$v.project.$dirty) return errors;
        !this.$v.project.required && errors.push("Project is required.");
        return errors;
      },
      enabledErrors() {
        const errors = [];
        if (!this.$v.enabled.$dirty) return errors;
        !this.$v.enabled.required && errors.push("Enabled is required");
        return errors;
      },
      issueTrackerErrors() {
        const errors = [];
        if (!this.$v.issueTracker.$dirty) return errors;
        !this.$v.issueTracker.required &&
          errors.push("Issue Tracker is required");
        return errors;
      },
      serviceTypeErrors() {
        const errors = [];
        if (!this.$v.serviceType.$dirty) return errors;
        !this.$v.serviceType.required &&
          errors.push("Service Type is required");
        return errors;
      },
      channelErrors() {
        const errors = [];
        if (!this.$v.channels.$dirty) return errors;
        !this.$v.channels.required && errors.push("Channel is required");
        return errors;
      },
    },
    components: {
      modal: Modal,
      "datetime-picker": DateTimePicker,
      "title-alert-dialog": TitleAlertDialog,
    },
    methods: {
      closeDialog() {
        this.$emit("closeModal");
      },
      copyMessageBody() {
        const el = document.createElement("textarea");
        el.value = ServiceTypeMapping.messageBody.copyText;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      },
    },
  };
</script>
