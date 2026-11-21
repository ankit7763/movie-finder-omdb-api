# Movie Finder

A simple React and Tailwind CSS app that searches movies with the OMDb API and shows up to six results.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add your OMDb key to `.env.local`:

   ```env
   VITE_OMDB_API_KEY=your_omdb_api_key
   ```

4. Start the app with `npm run dev`.

Get an OMDb API key at https://www.omdbapi.com/apikey.aspx.

`.env.local` is ignored by Git. Vite variables with the `VITE_` prefix are included in the browser bundle, so this setup is intended for a demo key.
