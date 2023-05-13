import express from 'express';
import {
  invalidPathHandler,
  errorResponder,
} from '../middleware/error-handling';
import { router } from '../routes';

const app = express();

app.set('port', process.env.PORT || 2004);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.use(errorResponder);
app.use(invalidPathHandler);

const port = app.get('port');
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default server;
