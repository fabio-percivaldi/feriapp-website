export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "eu-west-1",
    BUCKET: "feriapp-website"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://94aktgdse7.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_kOBL2eakF",
    APP_CLIENT_ID: "4b6jqffh0c46vif5kt2gm9ii4j",
    IDENTITY_POOL_ID: "eu-west-1:bf62a8ab-7efd-48e3-80a1-c20523c9f0f8"
  },
  social: {
    FB: "478083609490605",
  }
};
