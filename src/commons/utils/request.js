
export let GETAA = (url) => {

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': "application/json",
    },
  }).then((response) => response.json()).then((res) => {
    return res
  }).catch((error) => { return error });

}


export let POSTAA = (url, params) => {

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify(params),
  }).then((response) => response.json()).then((res) => {
    return res
  }).catch((error) => { return error });

}


export default {
  GETAA,
  POSTAA
}
