import BackendUrl from "./BackendUrl";

export default function ProjectApiList() {
  let baseUrl = BackendUrl;
  let apiList = {
    //heartBeatApi
    api_checkHeartBeat: `${baseUrl}/api/heartbeat`,
    // 1 API TO MENU LIST
    api_getFreeMenuList: `${baseUrl}/api/menu/by-module`,
    //WARD LIST
    api_login: `${baseUrl}/api/login`,

    // 19 API TO GET WORKFLOW BASIC INFO LIKE PERMISSIONS/WORKFLOW-CANDIDATES
    api_workflowInfo: `${baseUrl}/api/workflow/role-map/workflow-info`,

    // 21 API TO POST DEPARTMENTAL COMMUNICATION DATA
    api_postDepartmental: `${baseUrl}/api/post-custom-data`,

    // 22 API TO TO GET SAF DEPARTMENTAL COMMUNICATION LIST
    api_getDepartmentalData: `${baseUrl}/api/get-all-custom-tab-data`,

    //application demand detail in demand screen
    api_verifyDocuments: `${baseUrl}/api/workflows/document/verify-reject`,
    //application demand detail in demand screen
    api_changePassword: `${baseUrl}/api/change-password`,

    // API TO EDIT ADMIN PROFILE
    api_editAdminProfile: `${baseUrl}/api/edit-my-profile`,
    // API TO FETCH JSK DASHBOARD RECENT APPLICATIONS AND RECENT PAYMENTS

    // API TO FETCH NOTIFICATION DATA
    api_getNotification: `${baseUrl}/api/get-user-notifications`,
    // API TO CREATE NOTIFICATION DATA
    api_createNotification: `${baseUrl}/api/dashboard/jsk/prop-dashboard`,
    // API TO DELETE NOTIFICATION DATA
    api_deleteNotification: `${baseUrl}/api/dashboard/jsk/prop-dashboard`,

    ///////{*******MARRIAGE API LIST********}////////
    marriageInbox: baseUrl + "/api/marriage/inbox",
    marriageDetails: baseUrl + "/api/marriage/details",
    workflowInfo: baseUrl + "/api/workflow/role-map/workflow-info",
    appointSet: baseUrl + "/api/marriage/set-appiontment-date",
    getUploadedDocument: baseUrl + "/api/marriage/get-uploaded-document",
    docVerify: baseUrl + "/api/marriage/doc-verify-reject",
    approveReject: baseUrl + "/api/marriage/final-approval-rejection",
    approvedList: baseUrl + "/api/marriage/approved-application",
    marriageApplicationList: baseUrl + "/api/marriage/search-application",
    marriageOrderId: baseUrl + "/api/marriage/generate-order-id",
    api_postMarriageOfflinePayment: baseUrl + "/api/marriage/offline-payment",
    api_MarriageReceipt: baseUrl + "/api/marriage/payment-receipt",
    api_marriageNextLevel: baseUrl + "/api/marriage/post-next-level",

    api_postMarriageSubmission: `${baseUrl}/api/marriage/apply`,
    api_getDocList: `${baseUrl}/api/marriage/get-doc-list`,
    api_docUpload: `${baseUrl}/api/marriage/upload-document`,
    api_getDetails: `${baseUrl}/api/marriage/static-details`,
    api_getList: `${baseUrl}/api/marriage/applied-application`,
    api_deleteApplication: `${baseUrl}/api/marriage/`,
    api_editMarriageApplication: `${baseUrl}/api/marriage/edit-application`,

    // ════════════════════════║🔰 Marriage Api List 🔰║═══════════════════════════
    marriageInbox: baseUrl + "/api/marriage/inbox",
    marriageDetails: baseUrl + "/api/marriage/details",
    workflowInfo: baseUrl + "/api/workflow/role-map/workflow-info",
    appointSet: baseUrl + "/api/marriage/set-appiontment-date",
    getUploadedDocument: baseUrl + "/api/marriage/get-uploaded-document",
    docVerify: baseUrl + "/api/marriage/doc-verify-reject",
    approveReject: baseUrl + "/api/marriage/final-approval-rejection",
    approvedList: baseUrl + "/api/marriage/approved-application",
    marriageApplicationList: baseUrl + "/api/marriage/search-application",
    marriageOrderId: baseUrl + "/api/marriage/generate-order-id",
    api_postMarriageOfflinePayment: baseUrl + "/api/marriage/offline-payment",
    api_MarriageReceipt: baseUrl + "/api/marriage/payment-receipt",
    api_marriageNextLevel: baseUrl + "/api/marriage/post-next-level",

    api_postMarriageSubmission: `${baseUrl}/api/marriage/apply`,
    api_getDocList: `${baseUrl}/api/marriage/get-doc-list`,
    api_docUpload: `${baseUrl}/api/marriage/upload-document`,
    api_getDetails: `${baseUrl}/api/marriage/static-details`,
    api_getList: `${baseUrl}/api/marriage/applied-application`,
    api_deleteApplication: `${baseUrl}/api/marriage/`,
    api_editMarriageApplication: `${baseUrl}/api/marriage/edit-application`,

    //Sample-Demo Api for PMS
    api_GetWaterTankerSearchData: `${baseUrl}/api/water-tanker/search-booking`, //search paramter from list
    api_getWaterTankerBookingDetailsById: `${baseUrl}/api/water-tanker/get-booking-details-by-id `, //get -by -id

    //Api for PMS
    api_addProcurement: `${baseUrl}/api/pms/sr/pre-procurement`,
    api_editProcurement: `${baseUrl}/api/pms/da/pre-procurement/edit`,
    api_editSrProcurement: `${baseUrl}/api/pms/sr/pre-procurement/edit`,

    api_itemCategory: `${baseUrl}/api/pms/master/category `,
    api_itemSubCategory: `${baseUrl}/api/pms/master/sub-category/by-category`,
    api_itemSubCategoryAll: `${baseUrl}/api/pms/master/sub-category`,
    api_itemBrand: `${baseUrl}/api/pms/master/by-subcategory`,
    // api_itemBrandNew: `${baseUrl}/api/pms/master/brand`,

    api_fetchProcessor: `${baseUrl}/api/pms/master/processor `,
    api_fetchRam: `${baseUrl}/api/pms/master/ram `,
    api_fetchOperatingSystem: `${baseUrl}/api/pms/master/os `,
    api_fetchRom: `${baseUrl}/api/pms/master/rom `,
    api_fetchGraphics: `${baseUrl}/api/pms/master/graphics `,

    api_fetchProcurementList: `${baseUrl}/api/pms/sr/pre-procurement`,
    api_fetchProcurementListInbox: `${baseUrl}/api/pms/sr/post-procurement`,
    api_fetchProcurementDAList: `${baseUrl}/api/pms/sr/pre-procurement/outbox`,
    api_fetchProcurementDetailById: `${baseUrl}/api/pms/sr/pre-procurement`,
    api_fetchOutboxProcurementDetailById: `${baseUrl}/api/pms/sr/pre-procurement/outbox`,
    api_postForwardToDA: `${baseUrl}/api/pms/sr/pre-procurement/to-da`,
    api_fetchProcurementRejectedList: `${baseUrl}/api/pms/sr/pre-procurement/rejected`,
    api_fetchProcurementReleasedList: `${baseUrl}/api/pms/sr/pre-procurement/released`,

    api_fetchProcurementDAListInbox: `${baseUrl}/api/pms/da/pre-procurement`,
    api_fetchProcurementDAListOutbox: `${baseUrl}/api/pms/da/pre-procurement/outbox`,
    api_fetchProcurementDADetailByIdinbox: `${baseUrl}/api/pms/da/pre-procurement`,
    api_fetchProcurementDADetailByIdOutbox: `${baseUrl}/api/pms/da/pre-procurement/outbox`,
    api_postBackToSR: `${baseUrl}/api/pms/da/pre-procurement/to-sr`,
    api_postReleaseTender: `${baseUrl}/api/pms/da/pre-procurement/release-tender`,
    api_postRejectTender: `${baseUrl}/api/pms/da/pre-procurement/reject`,
    api_postDaEditTender: `${baseUrl}/api/pms/da/pre-procurement/edit`,

    api_exportcsv: `${baseUrl}/api/pms/download`,

    //post
    api_fetchPostProcurementDetailById: `${baseUrl}/api/pms/da/post-procurement`,
    api_fetchPostProcurementDAListInbox: `${baseUrl}/api/pms/da/post-procurement`,
    api_fetchPostProcurementDAListOutbox: `${baseUrl}/api/pms/da/post-procurement/outbox`,
    api_postPostProcurementDaAdditionalDetails: `${baseUrl}/api/pms/da/post-procurement/save-additional-details`,
    api_fetchDaReceivedInvtListInbox: `${baseUrl}/api/pms/da/rec-inv`,

    //inventory
    api_fetchDaReceivedInvtListOutbox: `${baseUrl}/api/pms/da/rec-inv/outbox`,
    api_fetchDaReceivedInvtListOutboxId: `${baseUrl}/api/pms/da/rec-inv/outbox`,
    api_fetchDaReceivedInvtDetailById: `${baseUrl}/api/pms/da/rec-inv`,
    api_postDaReceivedInvtDetail: `${baseUrl}/api/pms/da/rec-inv/receive`,

    //sr
    api_fetchSrReceivedInvtListInbox: `${baseUrl}/api/pms/sr/rec-inv`,
    api_fetchSrReceivedInvtListOutbox: `${baseUrl}/api/pms/sr/rec-inv/outbox`,
    api_postSrAddInvt: `${baseUrl}/api/pms/sr/rec-inv/add-to-inv`,
    api_fetchSrInvtDetailsList: `${baseUrl}/api/pms/inventory/by-filter`,

    //BOQ
    api_fetchBoqList: `${baseUrl}/api/pms/acc/pre-procurement/list-for-boq`,

  };

  return apiList;
}
