import { useState } from 'react'
import { searchMovies } from './Api/Index'

function App() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const handleSearch = async (event) => {
    event.preventDefault()
    const title = query.trim()
    if (!title) {
      setError('Enter a movie title to search.')
      return
    }

    setLoading(true)
    setError('')
    setSearched(true)

    try {
      setMovies(await searchMovies(title))
    } catch (requestError) {
      setMovies([])
      setError(requestError instanceof Error ? requestError.message : 'Could not search movies.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-5 py-10 text-gray-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Movie Finder</h1>
          <p className="mt-2 text-gray-600">Search for a movie by title.</p>
        </header>

        <form onSubmit={handleSearch} className="mx-auto mb-8 flex max-w-md gap-2">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Batman..."
            aria-label="Movie title"
            className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            Search
          </button>
        </form>

        {loading && <p className="py-10 text-center text-gray-600">Searching movies...</p>}
        {error && <p className="py-4 text-center text-red-600">{error}</p>}
        {!loading && searched && !error && movies.length === 0 && (
          <p className="py-10 text-center text-gray-600">No movies found.</p>
        )}

        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {movies.map((movie) => (
              <article key={movie.imdbID} className="overflow-hidden rounded-lg bg-white shadow">
                {movie.Poster !== 'N/A' ? (
                  <img
                    src={movie.Poster}
                    alt={`${movie.Title} poster`}
                    loading="lazy"
                    className="aspect-[2/3] w-full bg-gray-200 object-cover"
                  />
                ) : (
                  <div className="flex aspect-[2/3] items-center justify-center bg-gray-200 text-gray-500">
                    No poster
                  </div>
                )}
                <div className="p-3">
                  <h2 className="font-semibold">{movie.Title}</h2>
                  <p className="mt-1 text-sm text-gray-600">{movie.Year}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        {!searched && !error && (
          <p className="py-10 text-center text-gray-500">Enter a title above to get started.</p>
        )}

        <footer className="mt-10 text-center text-sm text-gray-500">
          Movie information from OMDb API
        </footer>
      </div>
    </main>
  )
}

export default App
