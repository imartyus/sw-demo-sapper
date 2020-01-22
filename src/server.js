import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		(req, res, next) => {
			//
			res.json = (body) => {
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
				return res.end(body)
			}
			//
			res.apierror = (status = 400, message = 'Bad Request') => {
				res.writeHead(status, {
					'Content-Type': 'application/json'
				});
				return res.end(JSON.stringify({
					message
				}));
			}
			next()
		},
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware(),
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
