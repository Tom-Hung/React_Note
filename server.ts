import express ,{Request,Response} from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    
    // eslint-disable-next-line no-shadow
    server.get('/', (req: Request, res: Response, next: () => void) => {
      next();
    });
    
  })
  .catch((ex: Error) => {
    console.error(ex.stack);
    process.exit(1);
  });
