import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    screenMode: "dark",
    isLoading: false,
    error: "",
    nowPlayingMovieList: [],
    popularMovieList: [],
    upcomingMovieList: [],
    topRatedMovieList: [],
    singleMovieFetch: [],
    trailerLink: '',
    userAuth: {},
    watchList: [],
    sideBar: false,
    searchResult: [],
}

const BASE_URL = 'https://api.themoviedb.org/3/movie/'
const SERVER_BASE_URL = "http://localhost:4501/"

const API_KEY = '494170c64724d022e9296a5fa98644eb';
const TMDB_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTQxNzBjNjQ3MjRkMDIyZTkyOTZhNWZhOTg2NDRlYiIsInN1YiI6IjY0OTAyNGE5MjYzNDYyMDBhZTFjZGI1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7il3x7f91baELU8ceqe8OYauvsHEJ-lC34vS3Gslqoc'

const createMovieAsyncThunk = (name, type) => {
    return createAsyncThunk(
      `moviesList/${name}`,
      async ({ page }, { rejectWithValue }) => {
        const option = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        };
        const pageNo = page || page.page;
        const url = `${BASE_URL}${type}?language=en-US&page=${pageNo}`
        try {
          const response = await fetch(url, option);
  
          if (response.ok) {
            const result = await response.json();
            return result;
          } else {
            return rejectWithValue({ error: 'Movie Fetching Fails' });
          }
        } catch (error) {
          return rejectWithValue({ error: 'An error occurred during the fetch' });
        }
      }
    );
};

export const getNowPlaying = createMovieAsyncThunk('getNowPlaying', 'now_playing');
export const getPopular = createMovieAsyncThunk('getPopular', 'popular');
export const getUpcoming = createMovieAsyncThunk('getUpcoming', 'upcoming');
export const getTopRated = createMovieAsyncThunk('getTopRated', 'top_rated');

export const gettingSearchList = createAsyncThunk(
    'movieList/gettingSearchList',
    async({queryValue, page}, {rejectWithValue}) => {
        const option = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_TOKEN}`
            }
        }
        const url = `https://api.themoviedb.org/3/search/movie?query=${queryValue}&include_adult=true&language=en-US&page=${page}`
        try{
            const response = await fetch(url, option);
            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                return rejectWithValue({error: 'Movie Fetching Fails'})
            }
        } catch (e) {
            console.log(e)
        }
    }
)

export const getSingleMovie = createAsyncThunk(
    'moviesList/getSingleMovie',
    async ({id}, {rejectWithValue}) => {
        const option = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_TOKEN}`
            }
        }
        const url = `${BASE_URL}${id}?language=en-US`
        try{
            const response = await fetch(url, option);
            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                return rejectWithValue({error: 'Movie Fetching Fails'})
            }
        } catch (e) {
            console.log(e)
        }
    }
)
export const getTrailerOut = createAsyncThunk(
    'moviesList/getTrailerOut',
    async ({id}, {rejectWithValue}) => {
        const option = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_TOKEN}`
            }
        }
        const url = `${BASE_URL}${id}/videos?language=en-US`
        try{
            const response = await fetch(url, option);
            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                return rejectWithValue({error: 'Movie Fetching Fails'})
            }
        } catch (e) {
            console.log(e)
        }
    }
)

export const getSignup = createAsyncThunk(
    'userDetail/getSignup',
    async ({username, password, email, signing}, {rejectWithValue}) => {

        let url;
        let body;

        if (signing === 'login') {
            url = SERVER_BASE_URL + 'auth/login';
            body = {
                email,
                password,
            };
        } else if (signing === 'register') {
            url = SERVER_BASE_URL + 'auth/register';
            body = {
                username,
                email,
                password,
            };
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        };

        try{
            const response = await fetch(url, options);
            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                return rejectWithValue({error: 'Signing Fetching Fails'})
            }
        } catch (e) {
            console.log(e)
        }
    }
)
export const gettingWatchList =createAsyncThunk(
    'watchListGetting/gettingWatchList',
    async ({tokenValue, methods, suffix, movie }, {rejectWithValue}) => {

        let myHeaders = new Headers();
        myHeaders.append("projectID", "vflsmb93q9oc");
        myHeaders.append("Authorization", `Bearer ${tokenValue}`);
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('accept', 'application/json');

        let requestOptions;
        if (methods === "POST" || methods === "DELETE") {
            let raw = JSON.stringify({
                detail: movie,
              })
              requestOptions = {
                  method: methods,
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };
            } else if (methods === "GET") {
            requestOptions = {
                method: methods,
                headers: myHeaders,
                redirect: 'follow'
            };
        }
        let url = SERVER_BASE_URL + suffix
        

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const result = await response.json();
                return result
            } else {
                return rejectWithValue({error: 'Watch list fetching error'})
            }
        } catch (e) {
            console.log(e);
        }
    }
)




const movieSlices = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {
        screenModeToggler: (state, action) => {
            action.payload === "light" ? state.screenMode = "dark": state.screenMode = "light";
        },
        sideBarStore: (state, action) => {
            state.sideBar = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getNowPlaying.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getNowPlaying.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.nowPlayingMovieList = action.payload,
            state.error = ''
        })
        .addCase(getNowPlaying.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })

        .addCase(getPopular.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getPopular.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.popularMovieList = action.payload,
            state.error = ''
        })
        .addCase(getPopular.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })

        .addCase(getTopRated.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getTopRated.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.topRatedMovieList = action.payload,
            state.error = ''
        })
        .addCase(getTopRated.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })

        .addCase(getUpcoming.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getUpcoming.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.upcomingMovieList = action.payload,
            state.error = ''
        })
        .addCase(getUpcoming.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })

        .addCase(getSingleMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getSingleMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.singleMovieFetch = action.payload,
            state.error = ''
        })
        .addCase(getSingleMovie.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })
        
        .addCase(getTrailerOut.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getTrailerOut.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.trailerLink = action.payload,
            state.error = ''
        })
        .addCase(getTrailerOut.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })

        
        .addCase(getSignup.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getSignup.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.userAuth = action.payload,
            state.error = ''
        })
        .addCase(getSignup.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(gettingWatchList.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(gettingWatchList.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.watchList = action.payload,
            state.error = ''
        })
        .addCase(gettingWatchList.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(gettingSearchList.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(gettingSearchList.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.searchResult = action.payload,
            state.error = ''
        })
        .addCase(gettingSearchList.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
    }
})

export const { screenModeToggler, sideBarStore } = movieSlices.actions;
export default movieSlices.reducer;