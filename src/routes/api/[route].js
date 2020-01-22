import got from 'got'

export async function get(req, res, next) {
  // console.log(req.params, req.query);
  const {route} = req.params
  // TODO validation + proper routing
  try {
    if (route === 'search') {
      const { query, source } = req.query
      const resp = await got(`https://swapi.co/api/${source}/?search=${query}`)
      return res.json(resp.body)
    } 
    else if (route === 'details') {
      const { id, source } = req.query
      const resp = await got(`https://swapi.co/api/${source}/${id}`)
      return res.json(resp.body)
    }

    res.apierror(404, 'Not found')
    
  } catch (error) {
    console.log('error: ', error);
    res.statusCode = 500
    res.end('NOOO!')
  }
}