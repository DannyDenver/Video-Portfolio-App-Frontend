export const environment = {
  production: true,
  apiServerUrl: 'https://co9fey3jkg.execute-api.us-east-1.amazonaws.com/dev',
  auth0: {
    url: 'dannydenver', // the auth0 domain prefix
    audience: 'videoportfolio', // the audience set for the auth0 app
    clientId: 'Qz3CL88tGpZYJQFqXQNjdzgXW0QCmtcp', // the client id generated for the auth0 app
    callbackURL: 'https://www.reel-people.com/your-portfolio', // the base url of the running ionic application. 
    logoutURL: 'https://www.reel-people.com/'
  }
};
