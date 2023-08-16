const baseUrl = 'https://deezerdevs-deezer.p.rapidapi.com'
const apiKey = ''
export const searchUrl = `${baseUrl}/search?q=`

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
  }
}

export const getData = async (request) => {
  const response = await fetch(request, options);
  const result = await response.json()
  return result
}