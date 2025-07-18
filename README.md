# Polling System

## Deployment on Railway

1. **Provision MongoDB**: In Railway, add a MongoDB plugin or use your own connection string.
2. **Set Environment Variables**: In the Railway dashboard, add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: (Optional) The port, defaults to 3000 if not set
3. **Deploy**: Connect your GitHub repo to Railway and deploy. Railway will run `npm install` and `npm start` automatically.

## Local Development

1. Copy `.env.example` to `.env` and fill in your values.
2. Run `npm install`.
3. Start the server with `npm start` or `npm run dev` for hot reload. 