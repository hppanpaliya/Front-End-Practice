# News API Redis Server

This project is an Express server that fetches news data from the News API and caches responses using Redis to improve performance. 
It serves static files from a `public` directory and dynamically fetches news based on the request URL parameters.

## Prerequisites

- Node.js
- Redis server
- News API key

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
   ```
4. Place your static files in the `public` directory.

## Running the Server

Execute the following command to start the server:

```bash
npm start
```

The server will listen on port 4000 by default.

## Endpoints

- **`GET /*`**: Fetches news based on the query parameters and path.
