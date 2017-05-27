import {
  axios
} from './axios.min.js';

class Api {

  static getUser(pseudo) {
    return axios.get('https://api.twitchlolrank.com/users/' + pseudo)
      .then(function(response) {
        console.log(response);
        return response.data;
      })
  }
}
