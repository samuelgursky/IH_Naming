<template>
  <div class="card card-body">
    <p class="lead mb-2">Select Type</p>
    <select class="form-control" v-model="type">
      <option v-for="t in types" :key="t.id" :value="t.id">{{t.label}}</option>
    </select>
    <hr>

    <h4>{{selectedType.label}}</h4>

    <div class="row">
      <div
        v-for="field in selectedType.fields"
        :key="field.type"
        :class="field.columnSpan ? `col-sm-${field.columnSpan}` : 'col-sm-12'"
      >
        <!-- Iterate over each field in the selected type -->
        <div class="form-group">
          <div class="form-group">
            <label>{{ allFields[field.type].label }}</label>
            <i class="fa fa-question-circle-o ml-2 text-muted" :title="allFields[field.type].help"/>

            <!-- Service ID Field -->
            <!-- https://getbootstrap.com/docs/4.3/components/input-group/ -->
            <div class="input-group mb-1" v-if="field.type === 'SERVICE_ID_FIELD'">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">IH-</span>
              </div>
              <select class="form-control" v-model="project.service_id">
                <option>A</option>
                <option>C</option>
                <option>E</option>
                <option>F</option>
                <option>P</option>
                <option>V</option>
              </select>
            </div>

            <!-- Version Number Field -->
            <!-- https://getbootstrap.com/docs/4.3/components/input-group/ -->
            <div class="input-group mb-3" v-if="field.type === 'VERSION_NUMBER_FIELD'">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon3">V</span>
              </div>
              <select class="form-control" v-model="project.version_number">
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
              </select>
            </div>

            <!-- resolution Field -->
            <!-- https://getbootstrap.com/docs/4.3/components/input-group/ -->
            <div class="input-group mb-3" v-if="field.type === 'RESOLUTION'">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon3">V</span>
              </div>
              <select class="form-control" v-model="project.resolution">
                <option>1920x1080</option>
                <option>1080x1920</option>
                <option>1080x1080</option>
              </select>
            </div>

            <!-- resolution Field -->
            <!-- https://getbootstrap.com/docs/4.3/components/input-group/ -->
            <div class="input-group mb-3" v-if="field.type === 'CODEC'">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon3">V</span>
              </div>
              <select class="form-control" v-model="project.codec">
                <option>ProRes 4444 XQ</option>
                <option>ProRes 4444</option>
                <option>ProRes 422 HQ</option>
                <option>ProRes 422</option>
                <option>ProRes 422 LT</option>
                <option>ProRes 422 Proxy</option>
                <option>H264</option>
              </select>
            </div>

            <!-- audio routing Field -->
            <!-- https://getbootstrap.com/docs/4.3/components/input-group/ -->
            <div class="input-group mb-3" v-if="field.type === 'AUDIO_ROUTING'">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon3">V</span>
              </div>
              <select class="form-control" v-model="project.audio_routing">
                <option>5.1</option>
                <option>2.0</option>
              </select>
            </div>

            <input
              v-else-if="field.type === 'INITIALS'"
              required
              class="form-control"
              :placeholder="allFields[field.type].label"
              :type="allFields[field.type].type"
              maxlength="3"
              minlength="2"
              v-model="project[allFields[field.type].identifier]"
            >

            <!-- All other inputs -->
            <input
              v-else
              required
              class="form-control"
              :placeholder="allFields[field.type].label"
              :type="allFields[field.type].type"
              v-model="project[allFields[field.type].identifier]"
            >
          </div>
        </div>
      </div>
    </div>

    <br>
    <small class="text-muted">{{selectedType.label}}:</small>
    <pre class="bg-dark text-light p-2 rounded" v-if="selectedType.id === 'project_folder_name'">{{folderName}}</pre>
    <pre class="bg-dark text-light p-2 rounded" v-else-if="selectedType.id === 'project_file_name'">{{fileName}}</pre>
    <pre
      class="bg-dark text-light p-2 rounded"
      v-else-if="selectedType.id === 'review_export_name'"
    >{{ReviewExportName}}</pre>

    <!-- <small>Debugging</small> -->
    <!-- <pre>{{project}}</pre> -->
  </div>
</template>

<script>
import allTypes from "./types";
import allFields from "./fields";
import { version } from "punycode";

export default {
  data() {
    return {
      type: "project_file_name",
      types: allTypes,
      allFields: allFields,
      project: {
        job_id: "190000",
        client: "Client Name",
        project: "Project Name",
        service_id: "A",
        initials: "SLG",
        version_number: "01",
        resolution: "1920x1080",
        codec: "ProRes 422 HQ",
        audio_routing: "2.0"
      }
    };
  },
  methods: {
    sanitizeText(text) {
      return text.replace(/[^a-zA-Z\s]/gi, "").replace(/\s\s+/g, " ");
    },
    removeAllWhitespace(text) {
      return text.replace(/\s+/g, "");
    },
    formatDate(date) {
      function zeroPadDate(d) {
        return (d < 10 ? "0" : "") + d;
      }
      return (
        date.getFullYear() +
        zeroPadDate(date.getMonth() + 1) +
        zeroPadDate(date.getDate())
      );
    }
  },
  computed: {
    selectedType() {
      return this.types.find(each => each.id === this.type);
    },
    folderName() {
      // Variables for each access
      let jobId = this.project.job_id;
      let client = this.project.client;
      let project = this.project.project;

      // Removes non-alphabetic characters, chains of whitespace characters
      client = this.removeAllWhitespace(this.sanitizeText(client));
      project = this.removeAllWhitespace(this.sanitizeText(project));

      // Assembles foldername
      return jobId + "_" + client + "_" + project;
    },
    fileName() {
      // Variables for each access
      let jobId = this.project.job_id;
      let client = this.project.client;
      let project = this.project.project;
      let service_id = this.project.service_id;
      let initials = this.project.initials;
      let date = new Date();
      let version_number = this.project.version_number;

      // Removes non-alphabetic characters, chains of whitespace characters
      client = this.removeAllWhitespace(this.sanitizeText(client));
      project = this.removeAllWhitespace(this.sanitizeText(project));
      service_id = this.removeAllWhitespace(this.sanitizeText(service_id));
      initials = this.removeAllWhitespace(
        this.sanitizeText(initials)
      ).toUpperCase();
      date = this.formatDate(date);
      version_number = this.removeAllWhitespace(version_number);

      // Assembles filename
      return (
        jobId +
        "_" +
        client +
        "_" +
        project +
        "_" +
        "IH-" +
        service_id +
        "_" +
        initials +
        "_" +
        date +
        "_" +
        version_number
      );
    },
    ReviewExportName() {
      // Variables for each access
      let jobId = this.project.job_id;
      let client = this.project.client;
      let project = this.project.project;
      let service_id = this.project.service_id;
      let initials = this.project.initials;
      let date = new Date();
      let version_number = this.project.version_number;
      let resolution = this.project.resolution;
      let codec = this.project.codec;
      let audio_routing = this.project.audio_routing;

      // Removes non-alphabetic characters, chains of whitespace characters
      client = this.removeAllWhitespace(this.sanitizeText(client));
      project = this.removeAllWhitespace(this.sanitizeText(project));
      service_id = this.removeAllWhitespace(this.sanitizeText(service_id));
      initials = this.removeAllWhitespace(
        this.sanitizeText(initials)
      ).toUpperCase();
      date = this.formatDate(date);
      version_number = this.removeAllWhitespace(version_number);
      resolution = this.removeAllWhitespace(resolution);
      codec = this.removeAllWhitespace(codec);
      audio_routing = this.removeAllWhitespace(audio_routing);

      // Assembles filename
      return (
        jobId +
        "_" +
        client +
        "_" +
        project +
        "_" +
        "IH-" +
        service_id +
        "_" +
        initials +
        "_" +
        date +
        "_" +
        version_number +
        "-" +
        resolution +
        "-" +
        codec +
        "-" +
        audio_routing
      );
    }
  }
};
</script>

}
};
</script>

