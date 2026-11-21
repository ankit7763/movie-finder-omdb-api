const OMDB_API = 'https://www.omdbapi.com/'

export const searchMovies = async (title) => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY
  if (!apiKey) {
    throw new Error('Add VITE_OMDB_API_KEY to your .env.local file.')
  }

  const url = new URL(OMDB_API)
  url.searchParams.set('apikey', apiKey)
  url.searchParams.set('s', title)
  url.searchParams.set('type', 'movie')

  const response = await fetch(url)
  const result = await response.json()
  if (result.Response === 'False') {
    if (result.Error === 'Movie not found!') return []
    if (/api key/i.test(result.Error || '')) {
      throw new Error(
        'OMDb rejected the API key. Check VITE_OMDB_API_KEY in .env.local; a TMDb key will not work.',
      )
    }
    throw new Error(result.Error || 'Could not search movies.')
  }
  if (!response.ok) throw new Error(`Movie search failed (${response.status}).`)

  if (!Array.isArray(result.Search)) {
    throw new Error('The movie service returned an unexpected response.')
  }

  return result.Search.slice(0, 6)
}
