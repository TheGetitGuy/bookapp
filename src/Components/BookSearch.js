import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import loadingIcon from "./assets/loader.gif"
import { fetchBookData, toggleWishlisted, incrementPage, setQueryString, decrementPage, setPage } from "./redux/bookSlice.js"
import Book from "./Book.js"
import useDebounce from "./useDebounce.js"
import "./BookSearch.css"
import PaginationButtons from "./PaginationButtons"
function BookSearch() {
  const dispatch = useDispatch()
  const { loadingBooks, searchQuery, page, allBooks: { totalResults, maxResults } } = useSelector((state) => state.bookSlice)
  const [debounce, timer] = useDebounce(500)
  function handleSubmit(e) {
    e.preventDefault()
    clearTimeout(timer)
    dispatch(fetchBookData(searchQuery))
  }
  function handleTextChange(e) {
    dispatch(setQueryString(e.target.value))
    debounce(() => dispatch(fetchBookData(e.target.value)))
  }
  function handleLikeClick(elementId) {
    dispatch(toggleWishlisted(elementId))
  }
  function renderBooks(state) {
    //extract this element to another component
    const books = state.bookSlice.allBooks.books.map(
      (element) => {
        return (
          <Book state={state.bookSlice} element={element} key={element.id} handleClick={handleLikeClick} />
        )
      }
    )
    return (books)
  }
   return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="searchInput" value={searchQuery || searchQuery} onChange={handleTextChange} type="text" placeholder="Search for Books here">

        </input>
        <button type="submit"> submit </button>
        {loadingBooks ? <img src={loadingIcon} alt="Loading" className="loadingNotif" height="40px" /> : null}

      </form>
      <div className="booksHolder">
        {useSelector((state) => (state.bookSlice.allBooks.books) ?
          renderBooks(state) : null)
        }
      <span className="pageControls">
        <PaginationButtons 
        dispatch={dispatch} 
        page={page} 
        largestPage = {Math.ceil(totalResults/maxResults)} 
        setPage={setPage}
        clickAction = {()=>{debounce(() => dispatch(fetchBookData(searchQuery)))}}
        />
       </span>
      </div>
    </div>
  )
}

export default BookSearch