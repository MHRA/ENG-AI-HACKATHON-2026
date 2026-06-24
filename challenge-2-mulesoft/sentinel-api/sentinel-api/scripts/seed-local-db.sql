-- =============================================================================
-- Local Development Database Setup for sentinel-api
-- Reverse-engineered from MuleSoft XML flows (mhra-s-address-v1-main.xml)
-- =============================================================================

-- Create the database (run this from master)
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'DigitalServiceDataStore')
BEGIN
    CREATE DATABASE DigitalServiceDataStore;
END
GO

USE DigitalServiceDataStore;
GO

-- =============================================================================
-- TABLES — inferred from stored procedure params and response columns
-- =============================================================================

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Country')
CREATE TABLE dbo.Country (
    countryId       SMALLINT PRIMARY KEY IDENTITY(1,1),
    countryName     NVARCHAR(200) NOT NULL,
    countryCode     VARCHAR(10),
    isEUCountry     BIT DEFAULT 0,
    isEEAandSwitzerland BIT DEFAULT 0,
    isEEACandidateCountry BIT DEFAULT 0
);
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Organisation')
CREATE TABLE dbo.Organisation (
    organisationId      INT PRIMARY KEY IDENTITY(1,1),
    organisationName    NVARCHAR(500),
    abbreviatedName     NVARCHAR(200),
    mhraNotes           NVARCHAR(MAX),
    vatRegNumber        NVARCHAR(50),
    companyRegNumber    NVARCHAR(50),
    fromDate            DATE,
    toDate              DATE,
    isRegistredUnder2017mdrs BIT DEFAULT 0,
    appianIdentifier    NVARCHAR(100),
    documentDescription NVARCHAR(500)
);
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Address')
CREATE TABLE dbo.[Address] (
    addressId               INT PRIMARY KEY IDENTITY(1,1),
    organisationId          INT,
    line_1                  NVARCHAR(500),
    line_2                  NVARCHAR(500),
    line_3                  NVARCHAR(500),
    line_4                  NVARCHAR(500),
    city                    NVARCHAR(200),
    [state]                 NVARCHAR(200),
    county                  NVARCHAR(200),
    region                  NVARCHAR(200),
    postCode                NVARCHAR(20),
    countryId               SMALLINT,
    isRegisteredAddress     BIT DEFAULT 0,
    isBillingAddress        BIT DEFAULT 0,
    isShippingAddress       BIT DEFAULT 0,
    isManufacturerSiteAddress BIT DEFAULT 0,
    contactDetailsTypeId    INT,
    contactTypeCode         NVARCHAR(50),
    addressTypeName         NVARCHAR(100),
    contactDetailTypeCode   NVARCHAR(50),
    parentOrganisationAddressConfirmed NVARCHAR(10),
    parentOrganisationId    INT,
    allowUserToConfirmAddress NVARCHAR(10),
    partyContactDetailId    INT,
    partyContactDetailFromDate DATE,
    partyContactDetailToDate   DATE,
    createdDate             DATETIME DEFAULT GETDATE(),
    modifiedDate            DATETIME DEFAULT GETDATE(),
    isActive                BIT DEFAULT 1,
    FOREIGN KEY (countryId) REFERENCES dbo.Country(countryId)
);
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ApplicationAddress')
CREATE TABLE dbo.ApplicationAddress (
    id                      INT PRIMARY KEY IDENTITY(1,1),
    applicationReferenceNumber NVARCHAR(50),
    addressId               INT,
    cfsApplicationId        INT,
    cfsApplicationAddressType NVARCHAR(50),
    FOREIGN KEY (addressId) REFERENCES dbo.[Address](addressId)
);
GO

-- =============================================================================
-- SEED DATA
-- =============================================================================

-- Countries
SET IDENTITY_INSERT dbo.Country ON;
INSERT INTO dbo.Country (countryId, countryName, countryCode, isEUCountry, isEEAandSwitzerland, isEEACandidateCountry)
VALUES
    (200, 'United Kingdom', 'GB', 0, 0, 0),
    (201, 'France', 'FR', 1, 1, 0),
    (202, 'Germany', 'DE', 1, 1, 0),
    (203, 'Switzerland', 'CH', 0, 1, 0),
    (204, 'Turkey', 'TR', 0, 0, 1);
SET IDENTITY_INSERT dbo.Country OFF;
GO

-- Organisations
SET IDENTITY_INSERT dbo.Organisation ON;
INSERT INTO dbo.Organisation (organisationId, organisationName, abbreviatedName, mhraNotes, vatRegNumber, companyRegNumber, fromDate, toDate, isRegistredUnder2017mdrs, appianIdentifier, documentDescription)
VALUES
    (1742, 'Acme Pharmaceuticals Ltd', 'Acme Pharma', 'Test organisation', 'GB123456789', '12345678', '2017-08-08', '9999-12-31', 1, 'APP-1742', 'Main org document'),
    (1744, 'Beta Healthcare Group', 'Beta Health', 'Second test org', 'GB987654321', '87654321', '2018-01-01', '9999-12-31', 1, 'APP-1744', 'Beta org document'),
    (1651, 'Gamma Medical Devices', 'Gamma Med', NULL, NULL, '11223344', '2019-06-15', '9999-12-31', 0, 'APP-1651', NULL);
SET IDENTITY_INSERT dbo.Organisation OFF;
GO

-- Addresses
SET IDENTITY_INSERT dbo.[Address] ON;
INSERT INTO dbo.[Address] (addressId, organisationId, line_1, line_2, line_3, line_4, city, [state], county, region, postCode, countryId, isRegisteredAddress, isBillingAddress, isShippingAddress, isManufacturerSiteAddress, contactDetailsTypeId, contactTypeCode, addressTypeName, contactDetailTypeCode, parentOrganisationAddressConfirmed, parentOrganisationId, allowUserToConfirmAddress, partyContactDetailId)
VALUES
    (1664, 1742, '8 William Court', 'Johnson Way', 'Blackpool', 'Liverpool street', 'London', 'London', 'London', 'England', 'EG18YH', 200, 1, 1, 1, 1, 2345, 'REG', 'Registered Address', 'PRIMARY', 'Yes', 1011, 'yes', 4902),
    (1668, 1744, '15 Queens Road', 'Industrial Estate', NULL, NULL, 'Manchester', 'Greater Manchester', 'Lancashire', 'North West', 'M1 4BT', 200, 1, 0, 1, 0, 2346, 'BIL', 'Billing Address', 'SECONDARY', 'No', NULL, 'no', 4903),
    (2041, 1651, '100 High Street', NULL, NULL, NULL, 'Birmingham', 'West Midlands', 'West Midlands', 'Midlands', 'B1 1AA', 200, 1, 1, 0, 1, 2347, 'MFG', 'Manufacturing Site', 'PRIMARY', NULL, NULL, NULL, 4904),
    (2042, 1651, '200 Science Park', 'Building C', NULL, NULL, 'Cambridge', 'Cambridgeshire', 'Cambridgeshire', 'East', 'CB1 2AB', 200, 0, 0, 1, 0, 2348, 'SHP', 'Shipping Address', 'TERTIARY', NULL, NULL, NULL, 4905);
SET IDENTITY_INSERT dbo.[Address] OFF;
GO

-- Application-Address mappings
INSERT INTO dbo.ApplicationAddress (applicationReferenceNumber, addressId, cfsApplicationId, cfsApplicationAddressType)
VALUES
    ('APP-2024-001', 1664, 1, 'BILLING'),
    ('APP-2024-001', 1668, 1, 'SHIPPING'),
    ('APP-2024-002', 2041, 2, 'REGISTERED'),
    ('CFS-2024-001', 1664, 3, 'CFS_BILLING');
GO

-- =============================================================================
-- STORED PROCEDURES — stub implementations matching MuleSoft flows
-- =============================================================================

-- 1. Get Application Addresses
IF OBJECT_ID('dbo.usp_API_Application_Address_Get', 'P') IS NOT NULL DROP PROCEDURE dbo.usp_API_Application_Address_Get;
GO
CREATE PROCEDURE dbo.usp_API_Application_Address_Get
    @applicationReferenceNumber VARCHAR(50)
AS
BEGIN
    SELECT
        a.organisationId,
        a.addressId,
        a.line_1,
        a.line_2,
        a.line_3,
        a.line_4,
        a.city,
        a.[state],
        a.county,
        a.region,
        a.postCode,
        a.countryId,
        c.countryName,
        c.countryCode,
        c.isEUCountry,
        c.isEEAandSwitzerland,
        c.isEEACandidateCountry,
        a.isRegisteredAddress,
        a.isBillingAddress,
        a.isShippingAddress,
        a.isManufacturerSiteAddress,
        a.contactDetailsTypeId,
        a.parentOrganisationAddressConfirmed,
        a.parentOrganisationId,
        a.allowUserToConfirmAddress,
        a.partyContactDetailId
    FROM dbo.[Address] a
    LEFT JOIN dbo.Country c ON a.countryId = c.countryId
    INNER JOIN dbo.ApplicationAddress aa ON a.addressId = aa.addressId
    WHERE aa.applicationReferenceNumber = @applicationReferenceNumber;
END
GO

-- 2. Get Organisation Previous Address
IF OBJECT_ID('dbo.usp_API_Organisation_Address_Previous_Get', 'P') IS NOT NULL DROP PROCEDURE dbo.usp_API_Organisation_Address_Previous_Get;
GO
CREATE PROCEDURE dbo.usp_API_Organisation_Address_Previous_Get
    @organisationId INTEGER,
    @applicationReferenceNumber VARCHAR(50)
AS
BEGIN
    SELECT
        a.organisationId,
        a.addressId,
        a.line_1,
        a.line_2,
        a.line_3,
        a.line_4,
        a.city,
        a.[state],
        a.county,
        a.region,
        a.postCode,
        a.countryId,
        c.countryName,
        c.countryCode,
        c.isEUCountry,
        c.isEEAandSwitzerland,
        c.isEEACandidateCountry,
        a.isRegisteredAddress,
        a.isBillingAddress,
        a.isShippingAddress,
        a.isManufacturerSiteAddress,
        a.contactDetailsTypeId,
        a.parentOrganisationAddressConfirmed,
        a.parentOrganisationId,
        a.allowUserToConfirmAddress,
        a.partyContactDetailId
    FROM dbo.[Address] a
    LEFT JOIN dbo.Country c ON a.countryId = c.countryId
    WHERE a.organisationId = @organisationId
      AND a.isActive = 0;
END
GO

-- 3. Get CFS Application Address
IF OBJECT_ID('dbo.usp_API_CFSApplication_Address_Get', 'P') IS NOT NULL DROP PROCEDURE dbo.usp_API_CFSApplication_Address_Get;
GO
CREATE PROCEDURE dbo.usp_API_CFSApplication_Address_Get
    @ApplicationReferenceNumber VARCHAR(50),
    @cfsApplicationAddressType VARCHAR(50)
AS
BEGIN
    SELECT
        a.organisationId,
        a.addressId,
        a.line_1,
        a.line_2,
        a.line_3,
        a.line_4,
        a.city,
        a.[state],
        a.county,
        a.region,
        a.postCode,
        a.countryId,
        c.countryName,
        c.countryCode,
        c.isEUCountry,
        c.isEEAandSwitzerland,
        c.isEEACandidateCountry,
        a.isRegisteredAddress,
        a.isBillingAddress,
        a.isShippingAddress,
        a.isManufacturerSiteAddress,
        a.contactDetailsTypeId,
        a.parentOrganisationAddressConfirmed,
        a.parentOrganisationId,
        a.allowUserToConfirmAddress,
        a.partyContactDetailId,
        aa.cfsApplicationId,
        aa.cfsApplicationAddressType
    FROM dbo.[Address] a
    LEFT JOIN dbo.Country c ON a.countryId = c.countryId
    INNER JOIN dbo.ApplicationAddress aa ON a.addressId = aa.addressId
    WHERE aa.applicationReferenceNumber = @ApplicationReferenceNumber
      AND aa.cfsApplicationAddressType = @cfsApplicationAddressType;
END
GO

-- 4. Get Organisation Address with Address Type Flags
IF OBJECT_ID('dbo.usp_API_Organisation_Address_withAddTypeFlags_Get', 'P') IS NOT NULL DROP PROCEDURE dbo.usp_API_Organisation_Address_withAddTypeFlags_Get;
GO
CREATE PROCEDURE dbo.usp_API_Organisation_Address_withAddTypeFlags_Get
    @organisationId INTEGER = NULL,
    @contactCategoryId VARCHAR(50) = NULL,
    @addressId VARCHAR(50) = NULL,
    @addressTypeCode VARCHAR(50) = NULL,
    @isActive BIT = NULL
AS
BEGIN
    SELECT
        a.organisationId,
        a.addressId,
        a.line_1,
        a.line_2,
        a.line_3,
        a.line_4,
        a.city,
        a.[state],
        a.county,
        a.region,
        a.postCode,
        a.countryId,
        c.countryName,
        c.countryCode,
        c.isEUCountry,
        c.isEEAandSwitzerland,
        c.isEEACandidateCountry,
        a.isRegisteredAddress,
        a.isBillingAddress,
        a.isShippingAddress,
        a.isManufacturerSiteAddress,
        a.contactDetailsTypeId,
        a.parentOrganisationAddressConfirmed,
        a.parentOrganisationId,
        a.allowUserToConfirmAddress,
        a.partyContactDetailId
    FROM dbo.[Address] a
    LEFT JOIN dbo.Country c ON a.countryId = c.countryId
    WHERE (@organisationId IS NULL OR a.organisationId = @organisationId)
      AND (@addressId IS NULL OR a.addressId = CAST(@addressId AS INT))
      AND (@addressTypeCode IS NULL OR a.contactTypeCode = @addressTypeCode)
      AND (@isActive IS NULL OR a.isActive = @isActive);
END
GO

-- 5. Migration User Organisation Address Validation Check
IF OBJECT_ID('dbo.usp_API_Migration_UserOrganisation_Address_Validation_Check', 'P') IS NOT NULL DROP PROCEDURE dbo.usp_API_Migration_UserOrganisation_Address_Validation_Check;
GO
CREATE PROCEDURE dbo.usp_API_Migration_UserOrganisation_Address_Validation_Check
    @userName VARCHAR(100),
    @repOrganisationId INTEGER
AS
BEGIN
    SELECT
        a.organisationId,
        a.addressId,
        a.line_1,
        a.line_2,
        a.line_3,
        a.line_4,
        a.city,
        a.[state],
        a.county,
        a.region,
        a.postCode,
        a.countryId,
        c.countryName,
        c.countryCode,
        c.isEUCountry,
        c.isEEAandSwitzerland,
        c.isEEACandidateCountry,
        a.isRegisteredAddress,
        a.isBillingAddress,
        a.isShippingAddress,
        a.isManufacturerSiteAddress,
        a.contactDetailsTypeId,
        a.parentOrganisationAddressConfirmed,
        a.parentOrganisationId,
        a.allowUserToConfirmAddress,
        a.partyContactDetailId
    FROM dbo.[Address] a
    LEFT JOIN dbo.Country c ON a.countryId = c.countryId
    WHERE a.organisationId = @repOrganisationId
      AND a.isActive = 1;
END
GO

-- 6. Check Address Duplicate
IF OBJECT_ID('dbo.usp_API_CHECK_ADDR_DUPLICATE_Get', 'P') IS NOT NULL DROP PROCEDURE dbo.usp_API_CHECK_ADDR_DUPLICATE_Get;
GO
CREATE PROCEDURE dbo.usp_API_CHECK_ADDR_DUPLICATE_Get
    @ORGANISATION_ID INTEGER,
    @ADDR_LINE_ONE NVARCHAR(500),
    @POST_CODE NVARCHAR(20),
    @EDIT_MODE TINYINT = NULL,
    @ADDR_ID INTEGER = NULL
AS
BEGIN
    SELECT
        'Org' AS datasetIdentifier,
        o.organisationId,
        o.organisationName,
        o.abbreviatedName,
        o.mhraNotes,
        o.vatRegNumber,
        o.companyRegNumber,
        o.fromDate,
        o.toDate,
        o.isRegistredUnder2017mdrs,
        a.addressId,
        a.line_1,
        a.line_2,
        a.line_3,
        a.line_4,
        a.city,
        a.[state],
        a.county,
        a.region,
        a.postCode,
        a.countryId,
        c.countryName,
        c.countryCode,
        c.isEUCountry,
        c.isEEAandSwitzerland,
        c.isEEACandidateCountry,
        a.isRegisteredAddress,
        a.isBillingAddress,
        a.isShippingAddress,
        a.isManufacturerSiteAddress,
        a.contactDetailsTypeId AS contactDetailTypeId,
        a.parentOrganisationAddressConfirmed,
        a.parentOrganisationId,
        a.allowUserToConfirmAddress,
        a.contactTypeCode,
        a.addressTypeName,
        a.contactDetailTypeCode,
        a.partyContactDetailFromDate,
        a.partyContactDetailToDate,
        o.appianIdentifier,
        o.documentDescription,
        a.partyContactDetailId
    FROM dbo.[Address] a
    INNER JOIN dbo.Organisation o ON a.organisationId = o.organisationId
    LEFT JOIN dbo.Country c ON a.countryId = c.countryId
    WHERE a.organisationId = @ORGANISATION_ID
      AND a.line_1 = @ADDR_LINE_ONE
      AND a.postCode = @POST_CODE
      AND (@ADDR_ID IS NULL OR a.addressId != @ADDR_ID);
END
GO

-- 7. Insert Address (POST)
IF OBJECT_ID('dbo.usp_API_ENC_MODULE_ADDR_Post', 'P') IS NOT NULL DROP PROCEDURE dbo.usp_API_ENC_MODULE_ADDR_Post;
GO
CREATE PROCEDURE dbo.usp_API_ENC_MODULE_ADDR_Post
    @PARTY_ID INTEGER,
    @SERVICE_ID SMALLINT,
    @EVENT_VERSION_ID INTEGER,
    @ADDR_LINE_ONE NVARCHAR(500),
    @ADDR_LINE_TWO NVARCHAR(500) = NULL,
    @ADDR_LINE_THREE NVARCHAR(500) = NULL,
    @ADDR_LINE_FOUR NVARCHAR(500) = NULL,
    @CITY NVARCHAR(200) = NULL,
    @STATE NVARCHAR(200) = NULL,
    @COUNTY_STATE_PROVINCE NVARCHAR(200) = NULL,
    @REGION NVARCHAR(200) = NULL,
    @POST_CODE NVARCHAR(20) = NULL,
    @COUNTRY_ID SMALLINT = NULL,
    @CONTACT_TYPE_ID SMALLINT = NULL,
    @USER_NAME VARCHAR(100) = NULL,
    @ADDR_ID INTEGER OUTPUT,
    @STATUS VARCHAR(50) OUTPUT,
    @Address_Type_Options VARCHAR(MAX) = NULL,
    @FROM_Date DATETIME = NULL
AS
BEGIN
    INSERT INTO dbo.[Address] (organisationId, line_1, line_2, line_3, line_4, city, [state], county, region, postCode, countryId, contactDetailsTypeId)
    VALUES (@PARTY_ID, @ADDR_LINE_ONE, @ADDR_LINE_TWO, @ADDR_LINE_THREE, @ADDR_LINE_FOUR, @CITY, @STATE, @COUNTY_STATE_PROVINCE, @REGION, @POST_CODE, @COUNTRY_ID, @CONTACT_TYPE_ID);

    SET @ADDR_ID = SCOPE_IDENTITY();
    SET @STATUS = 'Success';
END
GO

-- 8. Update Address (PUT)
IF OBJECT_ID('dbo.usp_API_ENC_MODULE_ADDR_Put', 'P') IS NOT NULL DROP PROCEDURE dbo.usp_API_ENC_MODULE_ADDR_Put;
GO
CREATE PROCEDURE dbo.usp_API_ENC_MODULE_ADDR_Put
    @PARTY_ID INTEGER,
    @SERVICE_ID SMALLINT,
    @EVENT_VERSION_ID INTEGER,
    @ADDR_LINE_ONE NVARCHAR(500) = NULL,
    @ADDR_LINE_TWO NVARCHAR(500) = NULL,
    @ADDR_LINE_THREE NVARCHAR(500) = NULL,
    @ADDR_LINE_FOUR NVARCHAR(500) = NULL,
    @CITY NVARCHAR(200) = NULL,
    @STATE NVARCHAR(200) = NULL,
    @COUNTY_STATE_PROVINCE NVARCHAR(200) = NULL,
    @REGION NVARCHAR(200) = NULL,
    @POST_CODE NVARCHAR(20) = NULL,
    @COUNTRY_ID SMALLINT = NULL,
    @CONTACT_TYPE_ID SMALLINT = NULL,
    @USER_NAME VARCHAR(100) = NULL,
    @ADDR_ID INTEGER,
    @STATUS VARCHAR(50) OUTPUT,
    @Address_Type_Options VARCHAR(MAX) = NULL,
    @NewAddressId INTEGER OUTPUT
AS
BEGIN
    UPDATE dbo.[Address]
    SET line_1 = ISNULL(@ADDR_LINE_ONE, line_1),
        line_2 = @ADDR_LINE_TWO,
        line_3 = @ADDR_LINE_THREE,
        line_4 = @ADDR_LINE_FOUR,
        city = ISNULL(@CITY, city),
        [state] = @STATE,
        county = @COUNTY_STATE_PROVINCE,
        region = @REGION,
        postCode = @POST_CODE,
        countryId = ISNULL(@COUNTRY_ID, countryId),
        modifiedDate = GETDATE()
    WHERE addressId = @ADDR_ID;

    SET @NewAddressId = @ADDR_ID;
    SET @STATUS = 'Success';
END
GO

-- 9. Delete Address
IF OBJECT_ID('dbo.usp_API_ENC_MODULE_ADDR_Delete', 'P') IS NOT NULL DROP PROCEDURE dbo.usp_API_ENC_MODULE_ADDR_Delete;
GO
CREATE PROCEDURE dbo.usp_API_ENC_MODULE_ADDR_Delete
    @Organisation_ID INTEGER,
    @RemoveAddrList_JSON NVARCHAR(MAX),
    @Status VARCHAR(50) OUTPUT
AS
BEGIN
    -- Parse the JSON and delete addresses
    -- JSON format: {"RemoveAddressList":[{"AddressId":2042},{"AddressId":2041}]}
    DELETE FROM dbo.ApplicationAddress
    WHERE addressId IN (
        SELECT JSON_VALUE(value, '$.AddressId')
        FROM OPENJSON(@RemoveAddrList_JSON, '$.RemoveAddressList')
    );

    DELETE FROM dbo.[Address]
    WHERE addressId IN (
        SELECT JSON_VALUE(value, '$.AddressId')
        FROM OPENJSON(@RemoveAddrList_JSON, '$.RemoveAddressList')
    )
    AND organisationId = @Organisation_ID;

    SET @Status = 'Success';
END
GO

-- =============================================================================
-- VERIFY — list all created procs
-- =============================================================================
SELECT name, create_date FROM sys.procedures WHERE name LIKE 'usp_API_%' ORDER BY name;
GO

PRINT '✓ DigitalServiceDataStore database setup complete with 9 stored procedures and seed data.';
GO
