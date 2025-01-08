
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const cors = require('cors'); // Import the CORS middleware

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Use the CORS middleware
    const corsOptions = {
      origin: '*', // Allow requests from any origin (update this as needed)
    };
    cors(corsOptions)(req, res, () => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
  }).listen(3000, (err) => {
    if (err) throw err;
    // console.log('> Ready on https://www.bimcopilot.com');
  });
});
