import axios from 'axios';
import Cookies from 'cookies';
import { config } from '../../../../config';

export default async function callback(req, res) {
  const { code } = req.query;
  const params = new URLSearchParams({
    client_id: config.client_id,
    client_secret: config.client_secret,
    grant_type: config.grant_type,
    code,
  });

  const tokenURL = `${config.token_endpoint}?redirect_uri=${config.redirect_uri}&${params.toString()}`;
  const { data } = await axios(tokenURL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-type': 'application/x-www-form-urlencoded',
    },
  });
  const cookies = new Cookies(req, res);
  cookies.set('access_token', data.access_token, { httpOnly: false });
  if (data.error) {
    res.end(data.error_description);
  }
  return res.redirect('/');
}
