const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const app = require('./app');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB Connection Successful');

    app.listen(process.env.PORT, () =>
      console.log(
        `Application is now running in ${process.env.NODE_ENV} listening on port ${process.env.PORT}`
      )
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
