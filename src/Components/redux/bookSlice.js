import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBookData = createAsyncThunk(
  "bookSlice/fetchBookData",
  async (queryString = "", thunkAPI) => {
    const workingState = thunkAPI.getState()
    console.log('PREFETCH',workingState.bookSlice.allBooks.totalResults)
    const maxResults = workingState.bookSlice.allBooks.maxResults 
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryString}&startIndex=${(+workingState.bookSlice.page - 1) * (+maxResults)}&maxResults=${+maxResults}`)
    return response.json()
  }
)
export const fetchSingleBook = createAsyncThunk(
  "bookSlice/fetchSingleBook",
  async (bookId = "", thunkAPI) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    return response.json()

  }
)
export const bookSlice = createSlice({
  name: "bookSlice",
  initialState: {
    searchQuery:"",
    likedBooks: {},
    likedBooksCache: [],
    allBooks: {
      totalResults:200,
      maxResults:10,
      books: []
    },
    loadingBooks: false,
    page: 1,
  },
  reducers: {
    //keep an object of likedbooks based on their id, and toggle its value
    toggleWishlisted: (state, action) => {
      const favBook = state.likedBooks[action.payload]
      if (favBook) { delete state.likedBooks[action.payload]; return }
      if (!favBook) { state.likedBooks[action.payload] = action.payload; return }
    },
    clearFavoriteCache: (state) => {
      state.likedBooksCache = []
    },
    incrementPage: (state) => {
      if (state.page < Math.ceil(state.allBooks.totalResults / state.allBooks.maxResults)){
        state.page = +state.page + 1
      }
    },
    decrementPage: (state) => {
      if (state.page > 0) {
        state.page -= 1
      }
    },
    setPage: (state, action) => {
      state.page = action.payload
      if (state.page >= Math.ceil(state.allBooks.totalResults / state.allBooks.maxResults)){
        state.page = Math.ceil(state.allBooks.totalResults / state.allBooks.maxResults)
      }
      
    },
    setQueryString: (state, action)=>{
      state.searchQuery = action.payload

    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookData.pending, (state, action) => {
      state.loadingBooks = true;
    })

    builder.addCase(fetchBookData.fulfilled, (state, action) => {
      state.loadingBooks = false; 
      state.allBooks.books = action.payload.items
      window.history.replaceState(null, null,`?query=${state.searchQuery}&pg=${state.page}`)
    })

    builder.addCase(fetchBookData.rejected, (state, action) => {
      state.loadingBooks = false;
      console.log("rejected")
    })

    builder.addCase(fetchSingleBook.fulfilled, (state, action) => {
      if (state.likedBooksCache.every((item) => { return item.id !== action.payload.id })) { state.likedBooksCache.push(action.payload) }
    })
    builder.addCase(fetchSingleBook.rejected, (state, action) => {
      console.log(action.payload)
    })

  }
});
export const { setPage, setQueryString, toggleWishlisted, clearFavoriteCache, incrementPage, decrementPage } = bookSlice.actions;
export default bookSlice.reducer