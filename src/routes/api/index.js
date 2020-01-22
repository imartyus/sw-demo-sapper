import got from 'got'

export async function get(req, res, next) {
  const resp = await got('https://swapi.co/api/')
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(resp.body)
}