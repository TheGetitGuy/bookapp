import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import loadingIcon from "./assets/loader.gif"
import { fetchBookData, toggleWishlisted, incrementPage, decrementPage } from "./redux/bookSlice.js"
import Book from "./Book.js"
import useDebounce from "./useDebounce.js"
import "./BookSearch.css"
function BookSearch() {
  const dispatch = useDispatch()
  const [queryString, setQueryString] = useState("")
  const { loadingBooks, page } = useSelector((state) => state.bookSlice)
  const debounce = useDebounce(500)
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(fetchBookData(queryString))
  }
  function handleTextChange(e) {
    setQueryString(e.target.value)
    debounce(() => dispatch(fetchBookData(queryString)))
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
        <input className="searchInput" onChange={handleTextChange} type="text" placeholder="Search for Books here" />
        <button type="submit"> submit </button>
        {loadingBooks ? <img src={loadingIcon} alt="Loading" className="loadingNotif" height="40px"/>: null}

      </form>
      <div className="booksHolder">
        {useSelector((state) => (state.bookSlice.allBooks.books) ?
          renderBooks(state) : null)
        }
      </div>
      <div className="pageControls">
        <button onClick={() => { dispatch(decrementPage()); dispatch(fetchBookData(queryString)) }}>←</button>
        <div>Page {page}</div>
        <button onClick={() => { dispatch(incrementPage()); dispatch(fetchBookData(queryString)) }}>→</button>
      </div>
    </div>
  )
}

export default BookSearch