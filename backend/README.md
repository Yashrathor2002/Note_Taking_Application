Backend setup:

1. cd backend
2. npm install
   (packages: express mongoose dotenv bcryptjs jsonwebtoken cors)
3. Create a .env file with:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=some_long_secret
   PORT=5000
4. npm start (or node server.js)
