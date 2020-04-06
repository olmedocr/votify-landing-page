const request    = require('request');
const url        = require('url');

const nop = () => {};

const clientId        = process.env.SPOTIFY_CLIENT_ID;
const clientSecret    = process.env.SPOTIFY_CLIENT_SECRET;
const clientCallback  = process.env.SPOTIFY_CALLBACK_URL;
const authString      = new Buffer(`${clientId}:${clientSecret}`).toString('base64');
const authorization   = `Basic ${authString}`;

const spotifyEndpoint = 'https://accounts.spotify.com/api/token';

exports.swap = (event, context) => {
  const formData = {
    grant_type:   'authorization_code',
    redirect_uri: config.SPOTIFY_CALLBACK_URL,
    code:         event.code,
  };
  const options = {
    uri:     url.parse(spotifyEndpoint),
    headers: { 'Authorization' : authorization },
    form :   formData,
    method:  'POST',
    json :   true
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (response.statusCode === 200) {
        body.refresh_token = encrpytion.encrypt(body.refresh_token, encSecret);
      }
      resolve(body);
    });
  }).then(value => context.succeed(value))
    .catch(e => context.fail(JSON.stringify(e)));
};