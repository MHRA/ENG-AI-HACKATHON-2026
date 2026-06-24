# Azure SQL Stored Procedures — Complete API Layer Reference

**Source:** Extracted from MuleSoft 3.9 system API XML flows (`sentinel-mulesoft-repo`)
**Database:** `DigitalServiceDataStore` on Azure SQL Server
**Schema:** `dbo`
**Naming convention:** `usp_API_*` (user stored procedure, API layer)

---

## Summary

| Service | Proc Calls | Domain |
|---------|-----------|--------|
| `mhra-s-address-v1` | 10 | Address management |
| `mhra-s-application-v1` | 7 | Regulatory applications |
| `mhra-s-contact-v1` | 6 | Contact/individual management |
| `mhra-s-device-v1` | 5 | Medical devices |
| `mhra-s-document-v1` | 7 | Document storage |
| `mhra-s-event-v1` | 37 | Events (haemovigilance, derogations, humanitarian, exceptional use) |
| `mhra-s-organisation-v1` | 19 | Organisation/company management |
| `mhra-s-payment-v1` | 2 | Fee payments |
| `mhra-s-product-v1` | 2 | Licensed products |
| `mhra-s-reference-service-v1` | 56 | Reference data / lookup tables |
| `mhra-s-shot-v1` | 13 | SHOT/SABRE haemovigilance (SOAP bridge) |
| `mhra-s-useraccount-v1` | 7 | Portal user accounts |
| **TOTAL** | **171** | |

---

## mhra-s-address-v1
**Domain:** Address management

### `dbo.usp_API_Application_Address_Get`

**Mule doc name:** Get Application Addresses StoredProc  
**Source:** `mhra-s-address-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `applicationReferenceNumber` | VARCHAR |

---

### `dbo.usp_API_Organisation_Address_Previous_Get`

**Mule doc name:** Get Org Previous AddressStoredProc  
**Source:** `mhra-s-address-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `applicationReferenceNumber` | VARCHAR |

---

### `dbo.usp_API_CFSApplication_Address_Get`

**Mule doc name:** Get CFS Application Address StoredProc  
**Source:** `mhra-s-address-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ApplicationReferenceNumber` | VARCHAR |
| `cfsApplicationAddressType` | VARCHAR |

---

### `dbo.usp_API_Organisation_Address_withAddTypeFlags_Get`

**Mule doc name:** Get Org Addresses StoredProc  
**Source:** `mhra-s-address-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `contactCategoryId` | VARCHAR |
| `addressId` | VARCHAR |
| `addressTypeCode` | VARCHAR |
| `isActive` | BIT |

---

### `dbo.usp_API_Migration_UserOrganisation_Address_Validation_Check`

**Mule doc name:** Get Migration Address StoredProc  
**Source:** `mhra-s-address-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `userName` | VARCHAR |
| `repOrganisationId` | INTEGER |

---

### `dbo.usp_API_CHECK_ADDR_DUPLICATE_Get`

**Mule doc name:** Get Address Duplicate Check StoredProc  
**Source:** `mhra-s-address-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ORGANISATION_ID` | INTEGER |
| `ADDR_LINE_ONE` | NVARCHAR |
| `POST_CODE` | NVARCHAR |
| `EDIT_MODE` | TINYINT |
| `ADDR_ID` | INTEGER |

---

### `dbo.usp_API_ENC_MODULE_ADDR_Post`

**Mule doc name:** Post Address StoredProc  
**Source:** `mhra-s-address-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `PARTY_ID` | INTEGER |
| `SERVICE_ID` | SMALLINT |
| `EVENT_VERSION_ID` | INTEGER |
| `ADDR_LINE_ONE` | NVARCHAR |
| `ADDR_LINE_TWO` | NVARCHAR |
| `ADDR_LINE_THREE` | NVARCHAR |
| `ADDR_LINE_FOUR` | NVARCHAR |
| `CITY` | NVARCHAR |
| `STATE` | NVARCHAR |
| `COUNTY_STATE_PROVINCE` | NVARCHAR |
| `REGION` | NVARCHAR |
| `POST_CODE` | NVARCHAR |
| `COUNTRY_ID` | SMALLINT |
| `CONTACT_TYPE_ID` | SMALLINT |
| `USER_NAME` | VARCHAR |
| `Address_Type_Options` | VARCHAR |
| `FROM_Date` | TIMESTAMP |

---

### `dbo.usp_API_ENC_MODULE_ADDR_Put`

**Mule doc name:** Put Address StoredProc  
**Source:** `mhra-s-address-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `PARTY_ID` | INTEGER |
| `SERVICE_ID` | SMALLINT |
| `EVENT_VERSION_ID` | INTEGER |
| `ADDR_LINE_ONE` | NVARCHAR |
| `ADDR_LINE_TWO` | NVARCHAR |
| `ADDR_LINE_THREE` | NVARCHAR |
| `ADDR_LINE_FOUR` | NVARCHAR |
| `CITY` | NVARCHAR |
| `STATE` | NVARCHAR |
| `COUNTY_STATE_PROVINCE` | NVARCHAR |
| `REGION` | NVARCHAR |
| `POST_CODE` | NVARCHAR |
| `COUNTRY_ID` | SMALLINT |
| `CONTACT_TYPE_ID` | SMALLINT |
| `USER_NAME` | VARCHAR |
| `ADDR_ID` | INTEGER |
| `Address_Type_Options` | VARCHAR |

---

### `dbo.usp_API_ENC_MODULE_ADDR_Delete`

**Mule doc name:** Delete Address StoredProc  
**Source:** `mhra-s-address-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `Organisation_ID` | INTEGER |
| `RemoveAddrList_JSON` | NVARCHAR |

---

## mhra-s-application-v1
**Domain:** Regulatory applications

### `dbo.usp_API_ApplicationWorkInProgressItems_Get`

**Mule doc name:** Get Applications StoredProc  
**Source:** `mhra-s-application-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `OrgNameRef` | NVARCHAR |
| `AppRefNumber` | NVARCHAR |
| `serviceCode` | NVARCHAR |
| `applicationType` | NVARCHAR |
| `applicationStatusCode` | NVARCHAR |
| `applicationSubmittedFromDate` | TIMESTAMP |
| `applicationSubmittedToDate` | TIMESTAMP |
| `assignedToUserName` | NVARCHAR |
| `paymentStatus` | NVARCHAR |
| `OrganisationIdMultiple` | NVARCHAR |
| `submittedBy` | NVARCHAR |
| `includeCompleted` | SMALLINT |
| `isDraft` | INTEGER |
| `businessReviewRequired` | TINYINT |
| `applicationStatusDescription` | VARCHAR |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `partyAssociationTypeId` | INTEGER |
| `partyCategoryId` | INTEGER |
| `sortField` | VARCHAR |
| `isAscendingFlag` | BIT |

---

### `dbo.usp_Application_Organisation_Inprogress_Get`

**Mule doc name:** Get InProgress Applications StoredProc  
**Source:** `mhra-s-application-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationIds` | NVARCHAR |
| `activityTypeIds` | NVARCHAR |

---

### `dbo.usp_API_Application_Detail_Get`

**Mule doc name:** Get Application Details StoredProc  
**Source:** `mhra-s-application-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `applicationReferenceNumber` | NVARCHAR |

---

### `dbo.usp_API_Further_Info_Application_Event_Get`

**Mule doc name:** Get Applications Further Info  
**Source:** `mhra-s-application-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `parentApplicationReferenceNumber` | VARCHAR |
| `organisationId` | INTEGER |
| `childApplicationReferenceNumber` | VARCHAR |

---

### `dbo.usp_API_DR_CHILD_APPLICATION_FURTHER_INFORMATION_COUNT_Get`

**Mule doc name:** Get Related Applications Count StoredProc  
**Source:** `mhra-s-application-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventReferenceNumber` | VARCHAR |

---

### `dbo.usp_API_ORGANISATION_UNREGISTER_APPLICATION_Get`

**Mule doc name:** Get Unregister Manufacturer StoredProc  
**Source:** `mhra-s-application-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `applicationRefNumber` | VARCHAR |

---

### `dbo.usp_API_CFSApplication_Country_List_Get`

**Mule doc name:** Get  CFSApplication Countries StoredProc  
**Source:** `mhra-s-application-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ApplicationRefNumber` | VARCHAR |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscendingFlag` | BIT |

---

## mhra-s-contact-v1
**Domain:** Contact/individual management

### `dbo.usp_API_CHECK_ACCOUNT_DUPLICATE_Get`

**Mule doc name:** usp_API_CHECK_ACCOUNT_DUPLICATE_Get  
**Source:** `mhra-s-contact-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `firstName` | VARCHAR |
| `surname` | VARCHAR |
| `emailAddress` | VARCHAR |
| `editMode` | TINYINT |
| `organisationId` | INTEGER |
| `individualId` | INTEGER |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |

---

### `dbo.usp_API_Organisation_Contact_Get`

**Mule doc name:** usp_API_Organisation_Contact_Get  
**Source:** `mhra-s-contact-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `userName` | VARCHAR |
| `isMainContact` | TINYINT |
| `individualId` | INTEGER |
| `returnAllContacts` | TINYINT |
| `isUser` | INTEGER |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_ENC_Module_Individual_Post`

**Mule doc name:** usp_API_ENC_Module_Individual_Post  
**Source:** `mhra-s-contact-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `orgId` | INTEGER |
| `parentOrgId` | INTEGER |
| `titleId` | INTEGER |
| `firstName` | NVARCHAR |
| `surname` | NVARCHAR |
| `middleName` | NVARCHAR |
| `initials` | VARCHAR |
| `jobTitle` | NVARCHAR |
| `isMainContact` | BIT |
| `individualTelephone` | NVARCHAR |
| `individualEMail` | NVARCHAR |
| `eventId` | INTEGER |
| `eventVersion` | INTEGER |
| `userId` | VARCHAR |
| `userName` | VARCHAR |
| `associationFromDate` | DATE |

---

### `dbo.usp_API_ENC_Module_Individual_Put`

**Mule doc name:** usp_API_ENC_Module_Individual_Put  
**Source:** `mhra-s-contact-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `IndividualId` | INTEGER |
| `orgId` | INTEGER |
| `parentOrgId` | INTEGER |
| `titleId` | INTEGER |
| `firstName` | NVARCHAR |
| `surname` | NVARCHAR |
| `middleName` | NVARCHAR |
| `initials` | VARCHAR |
| `jobTitle` | NVARCHAR |
| `isMainContact` | BIT |
| `individualTelephone` | NVARCHAR |
| `individualEMail` | NVARCHAR |
| `eventId` | INTEGER |
| `eventVersion` | INTEGER |
| `userId` | VARCHAR |
| `createUser` | BIT |
| `userName` | VARCHAR |
| `activateUser` | BIT |

---

### `dbo.usp_API_ENC_Module_Individual_Delete`

**Mule doc name:** usp_API_ENC_Module_Individual_Delete  
**Source:** `mhra-s-contact-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `orgId` | INTEGER |
| `removeContactList_JSON` | NVARCHAR |
| `userId` | INTEGER |

---

## mhra-s-device-v1
**Domain:** Medical devices

### `dbo.usp_API_ENC_Device_AddDevice_API_Json_Post_Generic`

**Mule doc name:** usp_API_ENC_Device_AddDevice_API_Json_Post_Generic  
**Source:** `mhra-s-device-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `deviceJson` | NVARCHAR |
| `serviceId` | SMALLINT |
| `appUserName` | VARCHAR |

---

### `dbo.usp_API_ENC_Device_Registration_API_Json_Post_Generic`

**Mule doc name:** usp_API_ENC_Device_Registration_API_Json_Post_Generic  
**Source:** `mhra-s-device-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `serviceId` | SMALLINT |
| `deviceJson` | NVARCHAR |
| `appUserName` | VARCHAR |
| `eventId` | INTEGER |
| `eventVersion` | INTEGER |
| `activityTypeId` | SMALLINT |

---

### `dbo.usp_API_ENC_Device_Product_Registration_Json_Put`

**Mule doc name:** usp_API_ENC_Device_Product_Registration_Json_Put  
**Source:** `mhra-s-device-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `serviceId` | SMALLINT |
| `deviceJson` | NVARCHAR |
| `appUserName` | VARCHAR |
| `activityTypeId` | INTEGER |

---

### `dbo.usp_API_ENC_Further_Info_Device_Registration_Json_Put`

**Mule doc name:** usp_API_ENC_Further_Info_Device_Registration_Json_Put  
**Source:** `mhra-s-device-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `serviceId` | SMALLINT |
| `deviceJson` | NVARCHAR |
| `appUserName` | VARCHAR |
| `eventId` | INTEGER |
| `eventVersion` | INTEGER |
| `eventRefNumber` | VARCHAR |

---

### `dbo.usp_API_Device_CE_Certificate_ExpiryDate_Get`

**Mule doc name:** usp_API_Device_CE_Certificate_ExpiryDate_Get  
**Source:** `mhra-s-device-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `deviceIds` | VARCHAR |

---

## mhra-s-document-v1
**Domain:** Document storage

### `dbo.usp_API_Organisation_Documents_Get`

**Mule doc name:** API_Organisation_Documents_Get  
**Source:** `mhra-s-document-impl.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `documentTypeId` | INTEGER |
| `documentSubTypeId` | INTEGER |
| `isRejected` | BIT |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_Party_Event_Communication_Document_Get`

**Mule doc name:** API_Party_Event_Communication_Documents_Get  
**Source:** `mhra-s-document-impl.xml`

| Parameter | SQL Type |
|-----------|----------|
| `applicationReferenceNumber` | VARCHAR |
| `partyEventCommunicationId` | INTEGER |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_Device_Product_Documents_Get`

**Mule doc name:** API_Device_Product_Documents_Get  
**Source:** `mhra-s-document-impl.xml`

| Parameter | SQL Type |
|-----------|----------|
| `deviceId` | INTEGER |
| `productId` | INTEGER |
| `documentTypeId` | INTEGER |
| `expiryRequired` | TINYINT |
| `applicationReferenceNumber` | VARCHAR |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_CFSApplication_Document_Get`

**Mule doc name:** API_CFSApplication_Document_Get  
**Source:** `mhra-s-document-impl.xml`

| Parameter | SQL Type |
|-----------|----------|
| `documentTypeId` | VARCHAR |
| `applicationReferenceNumber` | VARCHAR |
| `isEditable` | TINYINT |

---

### `dbo.usp_API_Organisation_DeviceDocuments_Get`

**Mule doc name:** API_Organisation_DeviceDocuments_Get  
**Source:** `mhra-s-document-impl.xml`

| Parameter | SQL Type |
|-----------|----------|
| `documentTypeId` | INTEGER |
| `organisationId` | INTEGER |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_Representative_Organisation_Document_Get`

**Mule doc name:** API_Representative_Organisation_Document_Get  
**Source:** `mhra-s-document-impl.xml`

| Parameter | SQL Type |
|-----------|----------|
| `applicationReferenceNumber` | VARCHAR |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_Document_Get`

**Mule doc name:** Get Document Details  
**Source:** `mhra-s-document-impl.xml`

| Parameter | SQL Type |
|-----------|----------|
| `documentId` | INTEGER |

---

## mhra-s-event-v1
**Domain:** Events (haemovigilance, derogations, humanitarian, exceptional use)

### `dbo.usp_API_Application_Organisation_Inprogress_Get`

**Mule doc name:** usp_API_Application_Organisation_Inprogress_Get  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationIds` | NVARCHAR |
| `activityTypeIds` | NVARCHAR |

---

### `dbo.usp_API_Application_Device_Inprogress_Get`

**Mule doc name:** usp_API_Application_Device_Inprogress_Get  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `deviceIds` | NVARCHAR |
| `activityTypeIds` | NVARCHAR |

---

### `dbo.usp_API_Organisation_Name_Previous_Current_Get`

**Mule doc name:** usp_API_Organisation_Name_Previous_Current_Get  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `eventRefNumber` | VARCHAR |

---

### `dbo.usp_API_EXCEPTIONAL_USE_DEVICE_SEARCH_GET`

**Mule doc name:** usp_API_EXCEPTIONAL_USE_DEVICE_SEARCH_GET  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventRefNumber` | BIGINT |
| `deviceId` | INTEGER |

---

### `dbo.usp_API_HUMANITARIAN_CONSULTANT_POST`

**Mule doc name:** usp_API_HUMANITARIAN_CONSULTANT_POST  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `consultantDetails` | VARCHAR |

---

### `dbo.usp_API_Further_Info_Application_Event_Get`

**Mule doc name:** usp_API_Further_Info_Application_Event_Get  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `parentApplicationReferenceNumber` | VARCHAR |
| `organisationId` | INTEGER |
| `childApplicationReferenceNumber` | VARCHAR |

---

### `dbo.usp_Further_Info_Application_Event_Post`

**Mule doc name:** usp_Further_Info_Application_Event_Post  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `applicationReferenceNumber` | VARCHAR |
| `organisation_id` | INTEGER |
| `organisationDetailFurtherInformationId` | INTEGER |
| `businessUserComments` | NVARCHAR |
| `businessUserName` | VARCHAR |
| `eventVersionId` | INTEGER |

---

### `dbo.usp_API_DR_CHILD_APPLICATION_FURTHER_INFORMATION_COUNT_Get`

**Mule doc name:** usp_API_DR_CHILD_APPLICATION_FURTHER_INFORMATION_COUNT_Get  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventRefId` | VARCHAR |

---

### `dbo.usp_API_ORGANISATION_UNREGISTER_APPLICATION_Get`

**Mule doc name:** usp_API_ORGANISATION_UNREGISTER_APPLICATION_Get  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventRefId` | VARCHAR |

---

### `dbo.usp_API_CFSApplication_Country_List_Get`

**Mule doc name:** usp_API_CFSApplication_Country_List_Get  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventRefId` | VARCHAR |
| `page` | INTEGER |
| `size` | INTEGER |
| `isAscending` | BIT |
| `orderBy` | VARCHAR |

---

### `dbo.usp_API_ENC_Application_OrganisationRegistrationStatus_Put`

**Mule doc name:** usp_API_ENC_Application_OrganisationRegistrationStatus_Put  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ApplicationReferenceNumber` | VARCHAR |
| `OrganisationReviewStatusJson` | NVARCHAR |
| `ReviewUserName` | VARCHAR |

---

### `dbo.usp_API_ENC_Application_DeviceRegistrationStatus_Put`

**Mule doc name:** usp_API_ENC_Application_DeviceRegistrationStatus_Put  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ApplicationReferenceNumber` | VARCHAR |
| `DeviceReviewStatusJson` | NVARCHAR |
| `ReviewUserName` | VARCHAR |
| `IsProductApplication` | TINYINT |
| `AppRejectionReasonId` | INTEGER |

---

### `dbo.usp_API_ENC_Application_Organisation_Draft_Put`

**Mule doc name:** usp_API_ENC_Application_Organisation_Draft_Put  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ORGANISATION_ID` | INTEGER |
| `EVENT_REFERENCE_NUMBER` | VARCHAR |
| `ACCOUNT_APPLICATION_STATUS` | SMALLINT |
| `SERVICE_ID` | SMALLINT |
| `ACCOUNT_REJECTION_REASON_ID` | INTEGER |
| `REJECTION_COMMENTS` | NVARCHAR |
| `APP_USER_NAME` | NVARCHAR |
| `AuthRepOrgDocumentReviewJson` | NVARCHAR |

---

### `dbo.usp_API_ENC_Application_ApplicationAssignment_Put`

**Mule doc name:** Call usp_API_ENC_Application_ApplicationAssignment_Put  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ApplicationReferenceNumber` | VARCHAR |
| `AssignedToUserName` | VARCHAR |
| `ApplicationStatusId` | INTEGER |

---

### `dbo.usp_Application_CFSOrderApplicationStatus_Put`

**Mule doc name:** usp_Application_Status_Event_Put  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ApplicationReferenceNumber` | VARCHAR |
| `cfsStatusId` | INTEGER |
| `rejectionReasonJSON` | VARCHAR |

---

### `dbo.usp_API_ENC_Further_Info_Application_Event_Put`

**Mule doc name:** usp_API_ENC_Further_Info_Application_Event_Put  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `parentApplicationRefNo` | VARCHAR |
| `applicationReferenceNumber` | VARCHAR |
| `organisationId` | INTEGER |
| `documentJson` | NVARCHAR |
| `customerComments` | NVARCHAR |
| `eventVersionId` | INTEGER |
| `appUserId` | INTEGER |

---

### `dbo.usp_API_HAEMO_SERIOUS_INCIDENT_CONFIRMATION_POST`

**Mule doc name:** usp_API_HAEMO_SERIOUS_INCIDENT_CONFIRMATION_POST  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventConfirmation` | VARCHAR |
| `eventRefNumber` | BIGINT |

---

### `dbo.usp_API_HAEMO_CASE_FOOTNOTE_GET`

**Mule doc name:** usp_API_HAEMO_CASE_FOOTNOTE_GET  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventRefNumber` | BIGINT |
| `page` | INTEGER |
| `size` | INTEGER |
| `isAscending` | BIT |
| `orderBy` | VARCHAR |
| `documentTypeCode` | VARCHAR |

---

### `dbo.usp_API_HAEMO_FOOTNOTE_DOCUMENT_POST`

**Mule doc name:** usp_API_HAEMO_FOOTNOTE_DOCUMENT_POST  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `footnote` | VARCHAR |
| `eventRefNumber` | BIGINT |

---

### `dbo.usp_API_HAEMO_CASE_REVIEW_AUDITLOG_GET`

**Mule doc name:** usp_API_HAEMO_CASE_REVIEW_AUDITLOG_GET  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventRefNumber` | BIGINT |
| `page` | INTEGER |
| `size` | INTEGER |
| `isAscending` | BIT |
| `orderBy` | VARCHAR |

---

### `dbo.usp_API_ENC_CFS_Order_Application_API_Json_Post`

**Mule doc name:** usp_API_ENC_CFS_Order_Application_API_Json_Post  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `Organisation_Id` | INTEGER |
| `CFSOrderJson` | NVARCHAR |
| `EVENT_ID` | INTEGER |
| `Event_Version_Id` | INTEGER |
| `App_User_Name` | NVARCHAR |

---

### `dbo.usp_API_ENC_Document_StorageIdentifier_Put`

**Mule doc name:** usp_API_ENC_Document_StorageIdentifier_Put  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `DocJson` | NVARCHAR |

---

### `dbo.usp_HAEMO_ORGANISATION_INCIDENTS_TRANSFER_PATCH`

**Mule doc name:** usp_API_ENC_Document_StorageIdentifier_Put  
**Source:** `mhra-s-event-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `reportedOrganisationId` | INTEGER |
| `currentOrganisationId` | INTEGER |

---

### `dbo.usp_API_ApplicationWorkInProgressItems_Get`

**Mule doc name:** usp_API_ApplicationWorkInProgressItems_Get  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationName` | NVARCHAR |
| `applicationRefNumber` | NVARCHAR |
| `serviceCode` | NVARCHAR |
| `applicationType` | NVARCHAR |
| `applicationStatusCode` | NVARCHAR |
| `applicationSubmittedFromDate` | TIMESTAMP |
| `applicationSubmittedToDate` | TIMESTAMP |
| `assignedToUserName` | NVARCHAR |
| `paymentStatus` | NVARCHAR |
| `organisationIds` | NVARCHAR |
| `submittedBy` | NVARCHAR |
| `includeCompleted` | SMALLINT |
| `isDraft` | INTEGER |
| `businessReviewRequired` | TINYINT |
| `applicationStatusDescription` | VARCHAR |
| `partyAssociationTypeId` | INTEGER |
| `partyCategoryId` | INTEGER |
| `page` | INTEGER |
| `size` | INTEGER |
| `isAscending` | BIT |
| `orderBy` | VARCHAR |

---

### `dbo.usp_API_HAEMO_ADVERSE_BLOOD_INCIDENT_SEARCH_GET`

**Mule doc name:** usp_API_HAEMO_ADVERSE_BLOOD_INCIDENT_SEARCH_GET  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisation_Id` | INTEGER |
| `eventRefNumber` | BIGINT |
| `creationDate` | TIMESTAMP |
| `reportTypeCode` | VARCHAR |
| `incidentReferenceNumber` | VARCHAR |
| `localRefNo` | VARCHAR |
| `incidentFromDate` | TIMESTAMP |
| `incidentToDate` | TIMESTAMP |
| `notifiacationSubmittedFromDate` | TIMESTAMP |
| `notifiacationSubmittedToDate` | TIMESTAMP |
| `confirmationSubmittedFromDate` | TIMESTAMP |
| `confirmationSubmittedToDate` | TIMESTAMP |
| `issueNumber` | INTEGER |
| `footNotesSubmittedDate` | TIMESTAMP |
| `region` | VARCHAR |
| `folderId` | INTEGER |
| `isExcluded` | INTEGER |
| `isConfirmed` | INTEGER |
| `orgName` | VARCHAR |
| `incidentLocation` | VARCHAR |
| `eventInvolving` | VARCHAR |
| `reactionRelatedTo` | VARCHAR |
| `reporterName` | VARCHAR |
| `reporterOrganisationName` | VARCHAR |
| `mhraStatus` | VARCHAR |
| `incidentStatus` | VARCHAR |
| `shotStatus` | VARCHAR |
| `reporterAction` | VARCHAR |
| `categoryCode` | VARCHAR |
| `relatedEstablishmentId` | VARCHAR |
| `freeText` | NVARCHAR |
| `startPos` | INTEGER |
| `numberOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_EXCEPTIONAL_USE_INCIDENT_SEARCH_GET`

**Mule doc name:** usp_API_EXCEPTIONAL_USE_INCIDENT_SEARCH_GET  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventRefNumber` | VARCHAR |
| `organisationName` | VARCHAR |
| `applicationType` | VARCHAR |
| `workflowStatusId` | INTEGER |
| `parentEventRefNumber` | VARCHAR |
| `userType` | VARCHAR |
| `page` | INTEGER |
| `size` | INTEGER |
| `isAscending` | BIT |
| `orderBy` | VARCHAR |
| `organisationId` | VARCHAR |

---

### `dbo.usp_API_Application_Detail_Get`

**Mule doc name:** usp_API_Application_Detail_Get  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventRefId` | NVARCHAR |

---

### `dbo.usp_API_HAEMO_INCIDENT_Patch`

**Mule doc name:** usp_API_HAEMO_INCIDENT_Patch  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `incidentId` | BIGINT |
| `actionType` | VARCHAR |
| `mhraStatus` | VARCHAR |
| `incidentStatus` | VARCHAR |
| `reporterAction` | VARCHAR |
| `isExcluded` | BIT |
| `tagCategoryCode` | VARCHAR |
| `updatedBy` | VARCHAR |
| `updatedDate` | TIMESTAMP |
| `notificationReviewer` | VARCHAR |
| `confirmationReviewer` | VARCHAR |
| `exclusionReasonCode` | VARCHAR |
| `exclusionReasonOther` | VARCHAR |
| `folderId` | INTEGER |
| `isFlagged` | BIT |

---

### `dbo.usp_API_HUMANITARIAN_INCIDENT_STATUS_DECISION_Patch`

**Mule doc name:** usp_API_HUMANITARIAN_INCIDENT_STATUS_DECISION_Patch  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventRefNumber` | BIGINT |
| `decisionText` | VARCHAR |
| `currentWorkflowStatusId` | INTEGER |
| `createdBy` | VARCHAR |
| `createdDateTime` | TIMESTAMP |

---

### `dbo.usp_API_DEROGATIONS_FINAL_DECISION_PUT`

**Mule doc name:** usp_API_DEROGATIONS_FINAL_DECISION_PUT  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `decision` | VARCHAR |

---

### `dbo.usp_API_HAEMO_CASE_COMMENTS_GET`

**Mule doc name:** usp_API_HAEMO_CASE_COMMENTS_GET  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventRefNumber` | BIGINT |

---

### `dbo.usp_API_HAEMO_CASE_COMMENTS_POST`

**Mule doc name:** usp_API_HAEMO_CASE_COMMENTS_POST  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `incidentId` | BIGINT |
| `comments` | VARCHAR |
| `commentedBy` | VARCHAR |
| `commentedDate` | VARCHAR |

---

### `dbo.usp_API_HUMANITARIAN_CASE_COMMENTS_POST`

**Mule doc name:** usp_API_HUMANITARIAN_CASE_COMMENTS_POST  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `comments` | VARCHAR |

---

### `dbo.usp_API_DEROGATIONS_DCT_COMMENTS_SUPPORTINGDOCS_PUT`

**Mule doc name:** usp_API_DEROGATIONS_DCT_COMMENTS_SUPPORTINGDOCS_PUT  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `comments` | VARCHAR |

---

### `dbo.usp_API_ENC_CFS_Application_Document_Json_Post`

**Mule doc name:** usp_API_ENC_CFS_Application_Document_Json_Post  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `applicationReferenceNumber` | VARCHAR |
| `cfsDocumentJson` | NVARCHAR |
| `eventVersionId` | INTEGER |

---

### `dbo.usp_API_EXCEPTIONAL_USE_INCIDENT_ATTACH_DOCUMENT_POST`

**Mule doc name:** usp_API_EXCEPTIONAL_USE_INCIDENT_ATTACH_DOCUMENT_POST  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `humanitarianDocuments` | VARCHAR |

---

### `dbo.usp_API_DEROGATIONS_CORRESPONDENCE_DECISION_DOCUMENTS_PUT`

**Mule doc name:** usp_API_DEROGATIONS_CORRESPONDENCE_DECISION_DOCUMENTS_PUT  
**Source:** `mhra-s-event-v1-incident-flows.xml`

| Parameter | SQL Type |
|-----------|----------|
| `derogationDocuments` | VARCHAR |

---

## mhra-s-organisation-v1
**Domain:** Organisation/company management

### `dbo.usp_API_ORGANISATION_SEARCH_GET`

**Mule doc name:** usp_API_ORGANISATION_SEARCH_GET  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationIds` | VARCHAR |
| `organisationName` | VARCHAR |
| `serviceIds` | VARCHAR |
| `registrationStatusIds` | VARCHAR |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_Organisation_Detail_Get`

**Mule doc name:** usp_API_Organisation_Detail_Get  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ORGID` | INTEGER |

---

### `dbo.usp_API_Parent_AssociationType_By_Child_Get`

**Mule doc name:** usp_API_Parent_AssociationType_By_Child_Get  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ORGID` | INTEGER |

---

### `dbo.usp_API_PARTY_NOTES_Get`

**Mule doc name:** usp_API_PARTY_NOTES_Get  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `orgId` | INTEGER |
| `noteId` | INTEGER |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_ENC_PARTY_NOTES_Post`

**Mule doc name:** usp_API_ENC_PARTY_NOTES_Post  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `noteTitle` | NVARCHAR |
| `noteDescription` | NVARCHAR |
| `documentJson` | NVARCHAR |
| `recordedBy` | NVARCHAR |
| `recordedDate` | DATE |

---

### `dbo.usp_API_Organisation_Migration_Grace_Period_Get`

**Mule doc name:** usp_API_Organisation_Migration_Grace_Period_Get  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | NVARCHAR |
| `fromDate` | DATE |
| `toDate` | DATE |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |
| `parentOrgId` | INTEGER |

---

### `dbo.usp_API_ENC_Organisation_Registration_API_Json_Post_Generic`

**Mule doc name:** usp_API_ENC_Organisation_Registration_API_Json_Post_Generic  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationJson` | NVARCHAR |
| `activityTypeId` | SMALLINT |
| `eventVersionId` | INTEGER |
| `serviceId` | SMALLINT |
| `userName` | VARCHAR |
| `appUserName` | VARCHAR |
| `partyAssociationTypeId` | INTEGER |

---

### `dbo.usp_API_ENC_Organisation_Registration_API_Json_Put_Generic`

**Mule doc name:** usp_API_ENC_Organisation_Registration_API_Json_Put_Generic  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `organisationJson` | NVARCHAR |
| `activityTypeId` | SMALLINT |
| `serviceId` | SMALLINT |
| `appUserId` | INTEGER |
| `authRepOrgDocumentsJson` | NVARCHAR |

---

### `dbo.usp_API_ENC_PARD_OPTIONS_Put`

**Mule doc name:** usp_PARD_OPTIONS_Put  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `pardOptionsId` | INTEGER |
| `partyId` | INTEGER |
| `isPublishManufacturerName` | TINYINT |
| `isPublisAuthorisedRepName` | TINYINT |
| `isPublishManufacturerAddress` | TINYINT |
| `isPublishAuthrisedRepAddress` | TINYINT |

---

### `dbo.usp_API_ENC_Migration_UserOrganisation_Address_Confirmation_Flag_Put`

**Mule doc name:** usp_API_ENC_Migration_UserOrganisation_Address_Confirmation_Flag_Put  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `addressConfirmed` | SMALLINT |
| `addrId` | INTEGER |
| `addrLineOne` | NVARCHAR |
| `addrLineTwo` | NVARCHAR |
| `addrLineThree` | NVARCHAR |
| `addrLineFour` | NVARCHAR |
| `countyStateProvince` | NVARCHAR |
| `postCode` | NVARCHAR |
| `appUserId` | INTEGER |

---

### `dbo.usp_API_ENC_ORGANISATION_REGISTRATION_APPROVAL_Post`

**Mule doc name:** usp_API_ENC_ORGANISATION_REGISTRATION_APPROVAL_Post  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `eventReferenceNumber` | VARCHAR |
| `accountApplicationStatus` | SMALLINT |
| `serviceId` | SMALLINT |
| `accountRejectionReasonId` | INTEGER |
| `rejectionComments` | NVARCHAR |
| `userName` | NVARCHAR |

---

### `dbo.usp_API_ENC_ORGANISATION_UNREGISTRATION_BY_ADMIN_Put`

**Mule doc name:** usp_API_ENC_ORGANISATION_UNREGISTRATION_BY_ADMIN_Put  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `userName` | NVARCHAR |
| `applicationDate` | DATE |
| `applicationRefNumber` | VARCHAR |
| `appStatus` | VARCHAR |
| `rejectionComment` | NVARCHAR |
| `organisationId` | INTEGER |
| `requester` | VARCHAR |
| `reasonCode` | VARCHAR |
| `docTypeCode` | VARCHAR |
| `docDesc` | NVARCHAR |
| `docUploadTime` | DATE |
| `documentLocId` | INTEGER |
| `docLocationType` | VARCHAR |
| `docLocation` | NVARCHAR |
| `md5Hash` | NVARCHAR |
| `partyUnregisterAppRejectionReason` | SMALLINT |

---

### `dbo.usp_API_ENC_ORGANISATION_UNREGISTRATION_POST`

**Mule doc name:** usp_API_ENC_ORGANISATION_UNREGISTRATION_POST  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `userName` | NVARCHAR |
| `applicationDate` | DATE |
| `organisationId` | INTEGER |
| `requester` | VARCHAR |
| `reasonCode` | VARCHAR |
| `docTypeCode` | VARCHAR |
| `docDesc` | NVARCHAR |
| `docUploadTime` | DATE |
| `documentLocId` | INTEGER |
| `docLocationType` | VARCHAR |
| `docLocation` | NVARCHAR |
| `md5Hash` | NVARCHAR |
| `eventid` | INTEGER |

---

### `dbo.usp_API_ENC_CREATE_ACCOUNT_Post_Generic`

**Mule doc name:** usp_API_ENC_CREATE_ACCOUNT_Post_Generic  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationJson` | NVARCHAR |
| `serviceCode` | VARCHAR |
| `userName` | VARCHAR |
| `reviewedUserName` | VARCHAR |

---

### `dbo.usp_API_Organisation_Service_Permission_Post`

**Mule doc name:** usp_API_Organisation_Service_Permission_Post  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `serviceId` | INTEGER |
| `organisationRegistrationStatusId` | INTEGER |
| `comments` | VARCHAR |

---

### `dbo.usp_API_ENC_Migration_GracePeriod_Notification_Post`

**Mule doc name:** usp_API_Organisation_Service_Permission_Post  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationIdList` | VARCHAR |
| `notificationSentDate` | DATE |

---

### `dbo.usp_API_Organisation_Compliance_Post`

**Mule doc name:** usp_API_Organisation_Compliance_Post  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `isCompliance` | TINYINT |
| `complianceDesc` | VARCHAR |
| `createdBy` | VARCHAR |
| `isActive` | TINYINT |

---

### `dbo.usp_API_Organisation_Compliance_Get`

**Mule doc name:** usp_API_Organisation_Compliance_Get  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | VARCHAR |

---

### `dbo.usp_API_Organisation_Compliance_Put`

**Mule doc name:** usp_API_Organisation_Compliance_Put  
**Source:** `mhra-s-organisation-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `isCompliance` | TINYINT |
| `complianceDesc` | VARCHAR |
| `updatedBy` | VARCHAR |
| `isActive` | TINYINT |

---

## mhra-s-payment-v1
**Domain:** Fee payments

### `dbo.usp_API_ENC_PAYMENT_Post`

**Mule doc name:** Call Create Payment stored procedure  
**Source:** `mhra-s-payment-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `EVENT_VERSION_ID` | INTEGER |
| `APPLICATION_PAYMENT_STATUS_ID` | INTEGER |
| `SERVICE_ID` | INTEGER |
| `ACTIVITY_TYPE_ID` | INTEGER |
| `ORGANISATION_ID` | INTEGER |
| `APPIAN_REFERENCE_NUMBER` | NVARCHAR |
| `AMOUNT` | DECIMAL |
| `AUTHAMOUNT` | DECIMAL |
| `AUTHCOST` | DECIMAL |
| `EMAIL` | VARCHAR |
| `ADD_ID_ONE` | INTEGER |
| `ADD_ID_TWO` | INTEGER |
| `PAYMENT_METHOD_ID` | SMALLINT |
| `MERCHANT` | NVARCHAR |
| `CURRENCY` | NVARCHAR |
| `PAYMENT_REFERENCE_NO` | NVARCHAR |
| `WORLDPAYTICKET` | NVARCHAR |
| `PAYMENT_STATUS_ID` | SMALLINT |
| `AUTHORISATIONID` | INTEGER |
| `CVCRESULTCODE` | NVARCHAR |
| `AVSRESULTCODE` | NVARCHAR |
| `AAVADDRESSRESULTCODE` | NVARCHAR |
| `AAVPOSTCODERESULTCODE` | NVARCHAR |
| `AAVCARDHOLDERNAMERESULTCODE` | NVARCHAR |
| `AAVTELEPHONERESULTCODE` | NVARCHAR |
| `AAVEMAILRESULTCODE` | NVARCHAR |
| `THREEDSECURERESULT` | NVARCHAR |
| `CHARENC` | VARCHAR |
| `IPADDRESS` | VARCHAR |
| `INSTALLATION` | INTEGER |
| `INSTID` | INTEGER |
| `PAYMENTDESC` | VARCHAR |
| `COMPNAME` | VARCHAR |
| `LANG` | NVARCHAR |
| `CARDTYPE` | VARCHAR |
| `TESTMODE` | INTEGER |
| `CREATED_BY` | INTEGER |
| `PAYMENTDOCJSON` | NVARCHAR |

---

### `dbo.usp_API_ENC_BACSCHAPS_PAYMENT_APPROVAL_Put`

**Mule doc name:** Call Create Payment approval stored procedure  
**Source:** `mhra-s-payment-v1-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `APPIAN_REFERENCE_NUMBER` | NVARCHAR |
| `PAYMENT_STATUS_ID` | SMALLINT |
| `APPROVAL_DATETIME` | DATE |
| `APPROVED_BY` | VARCHAR |
| `ACTIVITY_TYPE_ID` | SMALLINT |
| `APP_REJECTION_REASON_ID` | SMALLINT |

---

## mhra-s-product-v1
**Domain:** Licensed products

### `dbo.usp_API_DeviceProduct_List_Get`

**Mule doc name:** Get Products  
**Source:** `mhra-s-product-impl.xml`

| Parameter | SQL Type |
|-----------|----------|
| `deviceId` | INTEGER |
| `applicationReferenceNumber` | VARCHAR |
| `statusIds` | VARCHAR |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |
| `OrganisationId` | INTEGER |
| `isRegistered` | BIT |
| `deviceTypeId` | INTEGER |
| `isCFSReady` | TINYINT |
| `gmdnCode` | VARCHAR |
| `productModel` | VARCHAR |
| `brandTradeName` | VARCHAR |
| `documentRef` | VARCHAR |

---

### `dbo.usp_API_DeviceProduct_Detail_Get`

**Mule doc name:** Get Product Details  
**Source:** `mhra-s-product-impl.xml`

| Parameter | SQL Type |
|-----------|----------|
| `productId` | NVARCHAR |

---

## mhra-s-reference-service-v1
**Domain:** Reference data / lookup tables

### `dbo.usp_REF_ORGANISATION_DETAIL_FURTHER_INFORMATION_BY_ORG_ROLE_Get`

**Mule doc name:** Get Organisation further Info References  
**Source:** `mhra-s-reference-service-v1-main-3.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationDetailFurtherinformationId` | SMALLINT |
| `organisationDetailFurtherInformationCode` | NVARCHAR |
| `organisationId` | INTEGER |
| `applicationReferenceNumber` | VARCHAR |

---

### `dbo.API_REF_PARTY_EVENT_COMMUNICATION_TYPE_Get`

**Mule doc name:** Retrieving Party Event Communication Type  
**Source:** `mhra-s-reference-service-v1-main-3.xml`

| Parameter | SQL Type |
|-----------|----------|
| `Code` | NVARCHAR |

---

### `dbo.API_REF_PARTY_EVENT_COMMUNICATION_DIRECTION_Get`

**Mule doc name:** Retrieving Party Event Communication Direction  
**Source:** `mhra-s-reference-service-v1-main-3.xml`

| Parameter | SQL Type |
|-----------|----------|
| `Code` | NVARCHAR |

---

### `dbo.usp_API_REF_HUMANITARIAN_CASE_WORKFLOW_STATUS_GET`

**Mule doc name:** SP Call - Fetch Exception Use Workflow Type  
**Source:** `mhra-s-reference-service-v1-main-3.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HUMANITARIAN_CASE_USER_TYPE_GET`

**Mule doc name:** SP Call - Fetch Exception Use User Type  
**Source:** `mhra-s-reference-service-v1-main-3.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_REF_Document_Type_Get`

**Mule doc name:** SP Call - Fetch Exception Use Document Type  
**Source:** `mhra-s-reference-service-v1-main-3.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_GENDER_GET`

**Mule doc name:** SP Call - Fetch Gender Types  
**Source:** `mhra-s-reference-service-v1-main-3.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_ADVERSE_BLOOD_INCIDENT_TYPE_GET`

**Mule doc name:** SP Call - Fetch Adverse Blood Incident Types  
**Source:** `mhra-s-reference-service-v1-main-3.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_EVENT_TYPE_GET`

**Mule doc name:** SP Call - Fetch Event Types  
**Source:** `mhra-s-reference-service-v1-main-3.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_Device_Guidance_Helptext_Get`

**Mule doc name:** Get  HelpTextGuidance StoredProc  
**Source:** `mhra-s-reference-service-v1-main-2.xml`

| Parameter | SQL Type |
|-----------|----------|
| `Code` | NVARCHAR |
| `DEVICE_RISK_CLASSIFICATION_ID` | SMALLINT |
| `DEVICE_TYPE_ID` | SMALLINT |

---

### `dbo.usp_API_REF_DEVICE_TYPE_Get`

**Mule doc name:** Get  deviceType StoredProc  
**Source:** `mhra-s-reference-service-v1-main-2.xml`

| Parameter | SQL Type |
|-----------|----------|
| `deviceTypeId` | INTEGER |
| `code` | INTEGER |

---

### `dbo.usp_API_REF_GMDN_Get`

**Mule doc name:** Get GMDNS StoredProc  
**Source:** `mhra-s-reference-service-v1-main-2.xml`

| Parameter | SQL Type |
|-----------|----------|
| `GMDN_CODE` | INTEGER |
| `DEVICE_TYPE_ID` | INTEGER |
| `TERM_NAME` | NVARCHAR |
| `GMDN_DESC` | NVARCHAR |
| `GMDN_ID` | INTEGER |
| `ISACTIVE` | SMALLINT |
| `MODIFIED_DATE` | DATE |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_REF_ACCOUNT_REJECTION_REASON_DRAFT_Get`

**Mule doc name:** Get DraftAccountRejectReasons StoredProc  
**Source:** `mhra-s-reference-service-v1-main-2.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ACCOUNT_REJECTION_REASON_CODE` | VARCHAR |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |

---

### `dbo.usp_API_REF_Common_Service_Get`

**Mule doc name:** SP Call - Fetch Services  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `Code` | NVARCHAR |

---

### `dbo.usp_API_REF_Application_Types_Get`

**Mule doc name:** SP Call - Fetch Application Types  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `serviceId` | VARCHAR |
| `isBusiness` | TINYINT |

---

### `dbo.usp_API_REF_Party_Category_Get_V1`

**Mule doc name:** SP Call - Fetch Party Categories  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `Code` | NVARCHAR |

---

### `dbo.usp_API_REF_Application_Status_Get`

**Mule doc name:** SP Call - Fetch Application Statuses  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `StatusType` | NVARCHAR |

---

### `dbo.usp_API_REF_ORGANISATION_REGISTRATION_STATUS_Get`

**Mule doc name:** SP Call - Fetch Organisations  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ORGANISATION_REGISTRATION_STATUS_ID` | SMALLINT |

---

### `dbo.usp_API_REF_ORGANISATION_DESCRIPTION_GET`

**Mule doc name:** SP Call - Fetch Organisation Descs  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationId` | INTEGER |
| `organisationDescription` | NVARCHAR |
| `isActive` | TINYINT |

---

### `dbo.usp_API_REF_DEVICE_TYPE_FILTER_Get`

**Mule doc name:** SP Call - Fetch Device Type Filters  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

*No input parameters*

---

### `dbo.usp_API_DR_CHILD_APPLICATION_FURTHER_INFORMATION_COUNT_Get`

**Mule doc name:** SP Call - Fetch Application Further Info Counts  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `eventReferenceNumber` | INTEGER |

---

### `dbo.usp_API_REF_Country_Get_V1`

**Mule doc name:** SP Call - Fetch Countries  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `Code` | NVARCHAR |
| `countryId` | INTEGER |
| `isEUCountry` | TINYINT |
| `isDRRegistrationCountry` | TINYINT |
| `isCFSRegistrationCountry` | TINYINT |
| `isCFSOrderCountry` | TINYINT |
| `isGlobalAPICountries` | TINYINT |
| `countryName` | NVARCHAR |
| `isActive` | TINYINT |
| `isEEAandSwitzerland` | TINYINT |
| `isEEACandidateCountry` | TINYINT |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |

---

### `dbo.usp_API_Notified_Body_Get_V1`

**Mule doc name:** SP Call - Fetch Notified Bodies  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `notifiedBodyId` | INTEGER |
| `notifiedBodyCode` | NVARCHAR |
| `notifiedBodyReference` | NVARCHAR |
| `countryCode` | NVARCHAR |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_RejectionReasons_ByType_Get`

**Mule doc name:** SP Call - Fetch Rejection Reasons  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `typeCode` | NVARCHAR |

---

### `dbo.usp_API_PARTY_CATEGORY_UNREGISTER_REASON_Get`

**Mule doc name:** SP Call - Fetch Unregistration Reasons  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `partyCategoryCode` | NVARCHAR |
| `ReasonCode` | NVARCHAR |

---

### `dbo.usp_API_REF_Title_Get`

**Mule doc name:** SP Call - Fetch Titles  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `code` | NVARCHAR |
| `titleId` | INTEGER |

---

### `dbo.usp_API_REF_DEVICE_REGISTRATION_FURTHER_INFORMATION_Get`

**Mule doc name:** SP Call - Fetch Device Further Info Details  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `deviceRegistrationFurtherInformationId` | INTEGER |
| `deviceRegistrationFurtherInformationCode` | NVARCHAR |

---

### `dbo.usp_API_REF_PriceCatalogues_Get`

**Mule doc name:** SP Call - Fetch Price Catalogues  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `catalogueType` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_BLOOD_PRODUCT_GET`

**Mule doc name:** SP Call - Fetch Blood Product Types  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_EVENT_INVOLVE_GET`

**Mule doc name:** SP Call - Fetch Involved Event Types  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_IMPLICATED_BLOOD_COMPONENT_GET`

**Mule doc name:** SP Call - Fetch Implicated Blood Component Types  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |
| `isReportable` | BIT |
| `isImplicatedComponent` | BIT |

---

### `dbo.usp_API_REF_HAEMO_IMPUTABILITY_LEVEL_GET`

**Mule doc name:** SP Call - Fetch Imputability Levels  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_LOCATION_OF_INCIDENT_GET`

**Mule doc name:** SP Call - Fetch Incident Locations  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_REACTION_TYPE_GET`

**Mule doc name:** SP Call - Fetch Reaction Types  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_SPECIFICATION_GET`

**Mule doc name:** SP Call - Fetch Specification Types  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_REF_BANK_ACCOUNT_Get`

**Mule doc name:** SP Call - Fetch Bank Accounts  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

*No input parameters*

---

### `dbo.usp_REF_ACCOUNT_REJECTION_REASON_Get`

**Mule doc name:** SP Call - Fetch Account Reject Reasons  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `ACCOUNT_REJECTION_REASON_CODE` | NVARCHAR |
| `ACCOUNT_REJECTION_REASON_ID` | INTEGER |

---

### `dbo.usp_REF_PAYMENT_STATUS_Get`

**Mule doc name:** SP Call - Fetch Payment Statuses  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `paymentStatusCode` | NVARCHAR |

---

### `dbo.usp_API_REF_DEVICE_TYPE_CERTIFICATE_TEXT_Get`

**Mule doc name:** SP Call - Fetch Device Type Certificate Texts  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `deviceId` | INTEGER |

---

### `dbo.usp_REF_PAYMENT_METHOD_Get`

**Mule doc name:** SP Call - Fetch Payment Methods  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `paymentMethodCode` | NVARCHAR |

---

### `dbo.usp_REF_PARTY_UNREGISTER_APPLICATION_REJECTION_REASON_Get`

**Mule doc name:** SP Call - Fetch Unregister Application Rejection Reasons  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `Code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_MHRA_STATUS_Get`

**Mule doc name:** SP Call - Fetch Haemo HMRA Statuses  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_INCIDENT_STATUS_Get`

**Mule doc name:** SP Call - Fetch Haemo HMRA Statuses  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_REPORT_WORKFLOW_Get`

**Mule doc name:** SP Call - Fetch Haemo Report Workflows  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_INCIDENT_CATEGORY_GET`

**Mule doc name:** SP Call - Fetch Haemo Incident Categories  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |
| `categoryType` | NVARCHAR |

---

### `dbo.usp_API_REF_DEROGATIONS_UK_HOSPITALS_SHARE`

**Mule doc name:** SP Call - Fetch Haemo Incident Categories  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_DEROGATIONS_WORKFLOW_GET`

**Mule doc name:** SP Call - Fetch Workflow Statuses  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `id` | INTEGER |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_TABLE_SEARCH_GET`

**Mule doc name:** SP Call - Fetch Workflow Statuses  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_TABLE_POST`

**Mule doc name:** SP Call - Post Sabre Attributes  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `refTableName` | NVARCHAR |
| `code` | NVARCHAR |
| `desc` | NVARCHAR |
| `categoryType` | NVARCHAR |
| `confirmationReminderDays` | INTEGER |

---

### `dbo.usp_API_REF_HAEMO_TABLE_PATCH`

**Mule doc name:** SP Call - Put Sabre Attributes  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `refTableName` | NVARCHAR |
| `code` | NVARCHAR |
| `desc` | NVARCHAR |
| `categoryType` | NVARCHAR |
| `confirmationReminderDays` | INTEGER |

---

### `dbo.usp_API_REF_HAEMO_TABLE_DELETE`

**Mule doc name:** SP Call - Put Sabre Attributes  
**Source:** `mhra-s-reference-service-v1-main-1.xml`

| Parameter | SQL Type |
|-----------|----------|
| `refTableName` | NVARCHAR |
| `code` | NVARCHAR |

---

### `dbo.usp_API_REF_HAEMO_EXCLUSION_REASON_GET`

**Mule doc name:** SP Call - Get exclusion reasons  
**Source:** `mhra-s-reference-service-v1-main-5.xml`

| Parameter | SQL Type |
|-----------|----------|
| `code` | VARCHAR |
| `id` | INTEGER |

---

### `dbo.usp_API_REF_Device_Guidance_Helptext_Certificate_Type_Get`

**Mule doc name:** Get Device SubTypes StoredProc  
**Source:** `mhra-s-reference-service-v1-main-4.xml`

| Parameter | SQL Type |
|-----------|----------|
| `deviceTypeId` | INTEGER |
| `DeviceRiskClassificationId` | INTEGER |
| `isCustom` | TINYINT |
| `isSterile` | TINYINT |
| `isMeasurable` | TINYINT |

---

### `dbo.usp_API_REF_HAEMO_TABLE_ENTRY_GET`

**Mule doc name:** SP Call - Get table reference codes  
**Source:** `mhra-s-reference-service-v1-main-6.xml`

| Parameter | SQL Type |
|-----------|----------|
| `code` | VARCHAR |
| `id` | INTEGER |

---

### `dbo.usp_API_REF_Contact_Category_Type_Get`

**Mule doc name:** SP Call - usp_API_REF_Contact_Category_Type_Get  
**Source:** `mhra-s-reference-service-v1-main-6.xml`

*No input parameters*

---

### `dbo.usp_REF_ORGANISATION_TYPE_Get`

**Mule doc name:** SP Call - usp_REF_ORGANISATION_TYPE_Get  
**Source:** `mhra-s-reference-service-v1-main-6.xml`

| Parameter | SQL Type |
|-----------|----------|
| `organisationTypeId` | INTEGER |
| `code` | VARCHAR |

---

## mhra-s-shot-v1
**Domain:** SHOT/SABRE haemovigilance (SOAP bridge)

### `dbo.usp_API_HAEMO_SHOT_WSDL_SENDREACTIONCONFIRMATION_PUT`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_SENDREACTIONCONFIRMATION_PUT  
**Source:** `mhra-s-shot-v1-database-to-sabre.xml`

| Parameter | SQL Type |
|-----------|----------|
| `CAR_NAME_REPORTER` | VARCHAR |
| `CARREPORTEREMAIL` | VARCHAR |
| `CARTELCONTACT` | VARCHAR |
| `CARPOSITION` | VARCHAR |
| `CARCONFIRMATIONDATE` | VARCHAR |
| `CARREACTIONDATE` | VARCHAR |
| `CARPRODUCT` | VARCHAR |
| `CARPRODUCTOTHER` | VARCHAR |
| `CARCONFIRMATION` | VARCHAR |
| `CARCHANGEREACTIONTYPE` | VARCHAR |
| `CARREACTIONTYPE` | VARCHAR |
| `CARREACTIONTYPEOTHER` | VARCHAR |
| `CARCLINICALOUTCOME` | VARCHAR |
| `CARIMPUTABILITY` | VARCHAR |
| `CARREPORT` | VARCHAR |
| `SABREREFERENCENUMBER` | VARCHAR |

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_SENDURLPACKET_PUT`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_SENDURLPACKET_PUT  
**Source:** `mhra-s-shot-v1-database-to-sabre.xml`

| Parameter | SQL Type |
|-----------|----------|
| `URLLINK` | NVARCHAR |
| `URLSABREREFERENCE` | VARCHAR |
| `URLQUESTSTATE` | VARCHAR |

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_CONFIRM_READ_PUT`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_CONFIRM_READ_PUT  
**Source:** `mhra-s-shot-v1-database-utilities.xml`

| Parameter | SQL Type |
|-----------|----------|
| `incidentIdsJson` | VARCHAR |
| `ORGSEARCH_READ` | BIT |
| `USERSEARCH_READ` | BIT |
| `GETEVENTCONFIRM_READ` | BIT |
| `GETEVENTNOTIFY_READ` | BIT |
| `GETREACTNOTIFY_READ` | BIT |

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_CONFIRM_FOOTNOTE_READ_PUT`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_CONFIRM_FOOTNOTE_READ_PUT  
**Source:** `mhra-s-shot-v1-database-utilities.xml`

| Parameter | SQL Type |
|-----------|----------|
| `footnoteIdsJson` | VARCHAR |

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_CONFIRM_REACTION_NOTIFICATION_DOCUMENT_READ_PUT`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_CONFIRM_REACTION_NOTIFICATION_DOCUMENT_READ_PUT  
**Source:** `mhra-s-shot-v1-database-utilities.xml`

| Parameter | SQL Type |
|-----------|----------|
| `footnoteIdsJson` | VARCHAR |

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_CONFIRM_EVENT_CONFIRMATION_DOCUMENT_READ_PUT`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_CONFIRM_EVENT_CONFIRMATION_DOCUMENT_READ_PUT  
**Source:** `mhra-s-shot-v1-database-utilities.xml`

| Parameter | SQL Type |
|-----------|----------|
| `footnoteIdsJson` | VARCHAR |

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_CONFIRM_EVENT_NOTIFICATION_DOCUMENT_READ_PUT`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_CONFIRM_EVENT_NOTIFICATION_DOCUMENT_READ_PUT  
**Source:** `mhra-s-shot-v1-database-utilities.xml`

| Parameter | SQL Type |
|-----------|----------|
| `footnoteIdsJson` | VARCHAR |

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_GETEVENTCONFIRM_GET`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_GETEVENTCONFIRM_GET  
**Source:** `mhra-s-shot-v1-database-from-sabre.xml`

*No input parameters*

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_GETEVENTNOTIFY_GET`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_GETEVENTNOTIFY_GET  
**Source:** `mhra-s-shot-v1-database-from-sabre.xml`

*No input parameters*

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_GETFOOTNOTES_GET`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_GETFOOTNOTES_GET  
**Source:** `mhra-s-shot-v1-database-from-sabre.xml`

*No input parameters*

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_GETREACTNOTIFY_GET`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_GETREACTNOTIFY_GET  
**Source:** `mhra-s-shot-v1-database-from-sabre.xml`

*No input parameters*

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_ORGSEARCH_GET`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_ORGSEARCH_GET  
**Source:** `mhra-s-shot-v1-database-from-sabre.xml`

*No input parameters*

---

### `dbo.usp_API_HAEMO_SHOT_WSDL_USERSEARCH_GET`

**Mule doc name:** usp_API_HAEMO_SHOT_WSDL_USERSEARCH_GET  
**Source:** `mhra-s-shot-v1-database-from-sabre.xml`

*No input parameters*

---

## mhra-s-useraccount-v1
**Domain:** Portal user accounts

### `dbo.usp_API_USER_PERMISSION_Get`

**Mule doc name:** usp_API_USER_PERMISSION_Get  
**Source:** `mhra-s-useraccount-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `userPermissionId` | INTEGER |
| `userId` | INTEGER |
| `startPos` | INTEGER |
| `noOfRows` | INTEGER |
| `sortField` | VARCHAR |
| `isAscending` | BIT |

---

### `dbo.usp_API_ENC_USER_PERMISSION_STATUS_Put`

**Mule doc name:** usp_API_USER_PERMISSION_Put  
**Source:** `mhra-s-useraccount-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `USER_NAME` | NVARCHAR |

---

### `dbo.usp_API_MHRA_System_Broadcast_UserAndMessage_GET`

**Mule doc name:** usp_API_MHRA_System_Broadcast_UserAndMessage_GET  
**Source:** `mhra-s-useraccount-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `serviceId` | INTEGER |
| `messageStatus` | VARCHAR |
| `userId` | INTEGER |
| `page` | INTEGER |
| `size` | INTEGER |
| `isAscending` | BIT |
| `orderBy` | VARCHAR |

---

### `dbo.usp_API_MHRA_System_Broadcast_Message_POST`

**Mule doc name:** usp_API_MHRA_System_Broadcast_Message_POST  
**Source:** `mhra-s-useraccount-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `service_Id` | INTEGER |
| `messageTitle` | VARCHAR |
| `broadcastMessage` | VARCHAR |
| `messageStartDate` | TIMESTAMP |
| `messageEndDate` | TIMESTAMP |
| `createdDate` | TIMESTAMP |
| `createdBy` | VARCHAR |

---

### `dbo.usp_API_MHRA_System_Broadcast_Message_PUT`

**Mule doc name:** usp_API_MHRA_System_Broadcast_Message_PUT  
**Source:** `mhra-s-useraccount-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `Broadcast_ID` | INTEGER |
| `service_Id` | INTEGER |
| `messageTitle` | VARCHAR |
| `broadcastMessage` | VARCHAR |
| `messageStartDate` | TIMESTAMP |
| `messageEndDate` | TIMESTAMP |
| `createdDate` | TIMESTAMP |
| `createdBy` | VARCHAR |

---

### `dbo.usp_API_MHRA_System_Broadcast_Message_User_view_POST`

**Mule doc name:** usp_API_MHRA_System_Broadcast_Message_POST  
**Source:** `mhra-s-useraccount-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `broadcast_Id` | INTEGER |
| `user_Id` | INTEGER |
| `messageViewDate` | TIMESTAMP |

---

### `dbo.usp_API_Service_Permission_Post`

**Mule doc name:** usp_API_Service_Permission_Post  
**Source:** `mhra-s-useraccount-main.xml`

| Parameter | SQL Type |
|-----------|----------|
| `UserId` | INTEGER |
| `organisationId` | INTEGER |
| `serviceId` | INTEGER |
| `userAccountStatusId` | INTEGER |
| `userPermissionStatusId` | INTEGER |

---

## Appendix A: Known Response Column Mappings

These output columns are derived from DataWeave response mappings in the Mule XML. They represent the columns returned by the stored procedure's result set.

### Address Service — GET Response Columns

All address GET procs return `resultSet1` with these columns:

| Column | JSON Type | Notes |
|--------|-----------|-------|
| `organisationId` | string | |
| `organisationName` | string | Only in some procs |
| `addressId` | string | |
| `line_1` | string | Address line 1 |
| `line_2` | string | Address line 2 |
| `line_3` | string | Address line 3 |
| `line_4` | string | Address line 4 |
| `city` | string | |
| `state` | string | |
| `county` | string | |
| `region` | string | |
| `postCode` | string | |
| `countryId` | string | |
| `countryName` | string | |
| `countryCode` | string | e.g. "GB" |
| `isEUCountry` | string ("true"/"false") | BIT→string coercion |
| `isEEAandSwitzerland` | string ("true"/"false") | BIT→string coercion |
| `isEEACandidateCountry` | string ("true"/"false") | BIT→string coercion |
| `isRegisteredAddress` | string ("true"/"false") | BIT→string coercion |
| `isBillingAddress` | string ("true"/"false") | BIT→string coercion |
| `isShippingAddress` | string ("true"/"false") | BIT→string coercion |
| `isManufacturerSiteAddress` | string ("true"/"false") | BIT→string coercion |
| `contactDetailsTypeId` | number | Optional (omitted if null) |
| `parentOrganisationAddressConfirmed` | string | Optional |
| `parentOrganisationId` | number | Optional |
| `allowUserToConfirmAddress` | string | Optional |
| `partyContactDetailId` | number | Optional |

### Address Service — Write Response

POST/PUT/DELETE procs return: `{ status: 'Success' | 'Failure', message: '...' }`
Validated by: `payload[0].status == 'Success'` — throws `StoredProcedureFailedException` if not.

---

## Appendix B: How to Get Full Proc Definitions

Once you have Azure SQL access, run:

```sql
-- All API procs with metadata
SELECT name, create_date, modify_date
FROM sys.procedures
WHERE name LIKE 'usp_API_%'
ORDER BY name;

-- Full source of a specific proc
EXEC sp_helptext 'dbo.usp_API_Application_Address_Get';

-- Parameter list with types and directions
SELECT
    p.name AS param_name,
    t.name AS type_name,
    p.max_length,
    p.is_output,
    p.has_default_value,
    p.default_value
FROM sys.parameters p
JOIN sys.types t ON p.user_type_id = t.user_type_id
WHERE object_id = OBJECT_ID('dbo.usp_API_Application_Address_Get')
ORDER BY p.parameter_id;
```

---

## Appendix C: Naming Convention Decoder

| Prefix/Pattern | Meaning |
|----------------|---------|
| `usp_API_` | User stored procedure for the API layer |
| `_Get` suffix | Read operation (SELECT) |
| `_Post` suffix | Create operation (INSERT) |
| `_Put` suffix | Update operation (UPDATE) |
| `_Delete` suffix | Delete operation (DELETE) |
| `_Patch` suffix | Partial update |
| `ENC_` prefix (after API_) | Encrypted/secure write operation |
| `REF_` prefix (after API_) | Reference data lookup |
| `HAEMO_` | Haemovigilance domain |
| `SHOT_WSDL_` | SABRE/SHOT interoperability |
| `HUMANITARIAN_` | Humanitarian use / exceptional access |
| `DEROGATIONS_` | Regulatory derogations |
| `Migration_` | Data migration utilities |
