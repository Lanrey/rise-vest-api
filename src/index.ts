import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import dataSource from './typeorm-config';

(async () => {
  dataSource
    .initialize()
    .then(() => {
      // Start express server
      console.log('Connected to DB successfully.')
      const port = app.get('port');
      app.listen(process.env.PORT || 3000, () => {

        console.log(`Service Started at http://localhost:${port}`);
        console.log('Press CTRL+C to stop\n');
      });

    }).catch(error => console.error('DB connection failed : ' + error));
})();