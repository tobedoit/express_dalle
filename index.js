// https://www.youtube.com/watch?v=EyIvuigqDoA
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

app.use(express.static('dist'));

app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// app.get('/', async(req, res) => {
//   res.sendFile(__dirname + '/dist/index.html');
// })

/* https://codingapple.com/unit/nodejs-react-integration/?id=2305
** 리액트 라우터가 핸들링 하도록 */
app.get('*', async(req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
})

const port = process.env.PORT || 8080;
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log('Server has started on port http://localhost:8080'));
  } catch (error) {
    console.log(error);
  }
}

startServer();