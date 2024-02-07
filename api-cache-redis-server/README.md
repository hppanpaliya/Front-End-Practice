# API Cache Redis Server

This project is an Express server that fetches news data from the APIs and caches responses using Redis to improve performance, reduce the number of requests and secure the API key.
It serves static files from a `public` directory.

## Prerequisites

- Node.js
- Redis server
- News API key
- Unsplash API key

## Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables in a `.env` file at the root of the project:
   ```
   API_KEY=<Your_News_API_Key>
   REDIS_PASSWORD=<Your_Redis_Password>
   REDIS_HOST=<Your_Redis_Host>
   REDIS_PORT=<Your_Redis_Port>
   UNSPLASH_ACCESS_KEY=<Your_UNSPLASH_ACCESS_KEY>
   ```
4. Place your static files in the `public` directory.

## Running the Server

Execute the following command to start the server:

```bash
npm start
```

The server will listen on port 4000 by default.

## Endpoints

- **`GET /unsplash`**: Queries the Unsplash API for images based on the query parameters.
- **`GET /*`**: Queries the News API for news data based on the query parameters.
