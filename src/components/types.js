export default [
  {
    id: "project_folder_name",
    label: "Project Folder Name",
    fields: [
      { type: "JOB_ID_FIELD", required: true },
      { type: "CLIENT_FIELD", required: true },
      { type: "PROJECT_FIELD", required: true }
    ]
  },
  {
    id: "project_file_name",
    label: "Project File Name",
    fields: [
      { type: "JOB_ID_FIELD", required: true },
      { type: "CLIENT_FIELD", required: true, columnSpan: 6 },
      { type: "PROJECT_FIELD", required: true, columnSpan: 6 },
      { type: "SERVICE_ID_FIELD", required: true, columnSpan: 6 },
      { type: "INITIALS", required: true, columnSpan: 6 },
      { type: "VERSION_NUMBER_FIELD", required: true, columnSpan: 6 }
      // { type: "DATE", required: true, columnSpan: 6 }
    ]
  },
  {
    id: "review_export_name",
    label: "Review Export",
    fields: [
      { type: "JOB_ID_FIELD", required: true },
      { type: "CLIENT_FIELD", required: true, columnSpan: 6 },
      { type: "PROJECT_FIELD", required: true, columnSpan: 6 },
      { type: "SERVICE_ID_FIELD", required: true, columnSpan: 6 },
      { type: "INITIALS", required: true, columnSpan: 6 },
      { type: "VERSION_NUMBER_FIELD", required: true, columnSpan: 6 },
      { type: "RESOLUTION", required: false, columnSpan: 6 },
      { type: "CODEC", required: false, columnSpan: 6 },
      { type: "AUDIO_ROUTING", required: false, columnSpan: 6 }
      // { type: "DATE", required: true, columnSpan: 6 }
    ]
  },
  {
    id: "final_export_name",
    label: "Final Export",
    fields: [
      { type: "JOB_ID_FIELD", required: true },
      { type: "CLIENT_FIELD", required: true, columnSpan: 6 },
      { type: "PROJECT_FIELD", required: true, columnSpan: 6 },
      { type: "SERVICE_ID_FIELD", required: true, columnSpan: 6 },
      { type: "INITIALS", required: true, columnSpan: 6 },
      { type: "VERSION_NUMBER_FIELD", required: true, columnSpan: 6 },
      { type: "RESOLUTION", required: true, columnSpan: 6 },
      { type: "CODEC", required: true, columnSpan: 6 },
      { type: "AUDIO_ROUTING", required: true, columnSpan: 6 }
      // { type: "DATE", required: true, columnSpan: 6 }
    ]
  },
  {
    id: "administrative_document",
    label: "Administrative Document",
    fields: [
      { type: "JOB_ID_FIELD", required: true },
      { type: "CLIENT_FIELD", required: true, columnSpan: 6 },
      { type: "PROJECT_FIELD", required: true, columnSpan: 6 },
      { type: "DOCUMENT_TYPE", required: true, columnSpan: 6 },
      { type: "SERVICE_ID_FIELD", required: true, columnSpan: 6 },
      { type: "VERSION_NUMBER_FIELD", required: true, columnSpan: 6 }
      // { type: "DATE", required: true, columnSpan: 6 }
    ]
  }
];
