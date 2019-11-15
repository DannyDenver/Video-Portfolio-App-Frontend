export const environment = {
  production: true,
  apiServerUrl: 'https://video-portfolio-backend.herokuapp.com/',
  auth0: {
    url: 'dannydenver', // the auth0 domain prefix
    audience: 'videoportfolio', // the audience set for the auth0 app
    clientId: 'Qz3CL88tGpZYJQFqXQNjdzgXW0QCmtcp', // the client id generated for the auth0 app
    callbackURL: 'https://video-portfolio.herokuapp.com/', // the base url of the running ionic application. 
  }
};
