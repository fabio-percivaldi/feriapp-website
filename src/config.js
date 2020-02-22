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
    IG_client_id: '17841425275240077',
    IG_app_secret: '3f96ea4141cd5219abcecc6f0931d296',
    IG_access_token: 'IGQVJXWUNlN193Y0NNZA2JZAbXg0V0I3dDNoNFFLTFhzdE9waFBoeHlfNlJjUFJJaGFqeFFLR3czS2tpZA3pxWDBLQWRaUGFrNTdmTjZANcTdkZAmdEZAVV1UlR4MWRHNWMtenY4MUE3MDNn'
  }
};
