import { useMovies } from "./Movies";
import { Movie } from "./typings";
import { act, renderHook } from "@testing-library/react-hooks";

const mockMovies: { Search: Movie[] } = {
  Search: [
    {
      imdbID: 1,
      score: 0,
      inQueue: false,
    },
    {
      imdbID: 2,
      score: 0,
      inQueue: false,
    },
    {
      imdbID: 3,
      score: 0,
      inQueue: false,
    },
    {
      imdbID: 4,
      score: 0,
      inQueue: false,
    },
    {
      imdbID: 5,
      score: 0,
      inQueue: false,
    },
  ],
};

const mockMoviesPage2: { Search: Movie[] } = {
  Search: [
    {
      imdbID: 5,
      score: 0,
      inQueue: false,
    },
    {
      imdbID: 6,
      score: 0,
      inQueue: false,
    },
  ],
};

fetch.mockResponse((req) => {
  switch (req.url) {
    case "http://www.omdbapi.com/?s=action&page=1&apikey=4640ef30":
      return Promise.resolve(JSON.stringify(mockMovies));
    case "http://www.omdbapi.com/?s=action&page=2&apikey=4640ef30":
      return Promise.resolve(JSON.stringify(mockMoviesPage2));
    default:
      return Promise.reject("bad url");
  }
});

describe("useMovies hook", () => {
  it("should render hook and expose the APIs", () => {
    const { result } = renderHook(() => useMovies());
    expect(result.current.movies).toEqual([]);
    expect(result.current.queue).toEqual([]);
    expect(typeof result.current.like).toBe("function");
    expect(typeof result.current.dislike).toBe("function");
    expect(typeof result.current.addToQueue).toBe("function");
    expect(typeof result.current.fetchAll).toBe("function");
  });

  it("should fetch a list of movies", async () => {
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.fetchAll();
    });
    expect(result.current.movies).toEqual(mockMovies.Search);
  });

  it("should fetch a second page of movies", async () => {
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.fetchAll();
    });
    await act(async () => {
      await result.current.fetchAll();
    });
    expect(result.current.movies).toEqual([
      ...mockMoviesPage2.Search,
      ...mockMovies.Search,
    ]);
  });

  it("should allow to add movie in queue", async () => {
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.fetchAll();
    });
    act(() => result.current.addToQueue(result.current.movies[4]));
    expect(result.current.queue).toEqual([result.current.movies[4]]);
  });

  it("should increase the score when liked", async () => {
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.fetchAll();
    });
    act(() => result.current.like(result.current.movies[4]));
    expect(result.current.movies.map((m) => m.score)).toEqual([0, 0, 0, 0, 1]);
  });

  it("should increase the score when disliked", async () => {
    const { result } = renderHook(() => useMovies());
    await act(async () => {
      await result.current.fetchAll();
    });
    act(() => result.current.dislike(result.current.movies[4]));
    expect(result.current.movies.map((m) => m.score)).toEqual([0, 0, 0, 0, -1]);
  });
});
