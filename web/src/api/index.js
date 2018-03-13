/**
 * API
 */
import axios from 'axios'

// Set URL
const URL = 'http://localhost:8080'

/**
 * Make a get request with axios
 * @param  {String}  route route for api call
 * @return {Promise}       Promise containing response from server
 */
const makeGetRequest = async (route) => {
  return new Promise((resolve, reject) => {
    axios.get(URL + route)
    .then((response) => {
      resolve(response)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

/**
 * Make a post request
 * @param  {String}  route    route for post request
 * @param  {[type]}  payload  payload for post request
 * @return {Promise}          promise of a response
 */
const makePostRequest = async (route, payload) => {
  return new Promise((resolve, reject) => {
    axios.post(URL + route, payload)
    .then((response) => {
      resolve(response)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

const headlines = {
  /**
   * Fetch positive headlines from the API
   * @return {Promise} promise for array of headlines
   */
  fetchPositiveHeadlines: async () => {
    let res = {}
    try {
      res = await makeGetRequest('/pos')
    } catch (e) {
      console.error(e)
    }
    return res.data.data.headlines
  },
  /**
   * Fetch negative headlines from the API
   * @return {Promise} promise for array of headlines
   */
  fetchNegativeHeadlines: async () => {
    let res = {}
    try {
      res = await makeGetRequest('/neg')
    } catch (e) {
      console.error(e)
    }
    return res.data.data.headlines
  },
  /**
   * Annotate a headline
   * @param  {[type]}  id   [description]
   * @param  {[type]}  vote [description]
   * @return {Promise}      [description]
   */
  postVote: async (id, uuid, vote) => {
    let res = {}
    let payload = {id: id, uuid: uuid}
    let subURL = ''
    switch (vote) {
      case 1:
        subURL = '/pos'
        break
      case -1:
        subURL = '/neg'
        break
      default:
        subURL = '/neg'
    }
    try {
      res = await makePostRequest('/annotate' + subURL, payload)
    } catch (e) {
      console.error(e)
      return
    }

    return res
  }
}

const user = {
  /**
   * Get a UUID for a user if not already set
   * @return {Promise} [description]
   */
  fetchUserId: async () => {
    let res = {}
    try {
      res = await makeGetRequest('/uuid')
    } catch (e) {
      console.error(e)
    }
    return res.data.data.uuid
  },
  fetchUserAnnotations: async (uuid) => {
    const url = '/user/annotations/' + uuid
    let res = {}
    try {
      res = await makeGetRequest(url)
    } catch (e) {
      console.error(e)
    }
    let annotations = res.data.data.annotations
    let userAns = {}

    for (let i = 0; i < annotations.length; i++) {
      if (userAns[annotations[i].headline_id] === undefined) {
        userAns[annotations[i].headline_id] = annotations[i].vote
      } else {
        userAns[annotations[i].headline_id] = userAns[annotations[i].headline_id] + annotations[i].vote
      }
    }

    console.log('returning annotations')

    return userAns
  }
}

export default {
  headlines,
  user
}
