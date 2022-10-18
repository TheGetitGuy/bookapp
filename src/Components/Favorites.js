import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import Book from "./Book.js"
import { fetchSingleBook, clearFavoriteCache, toggleWishlisted } from "./redux/bookSlice.js"
export default function Favorites() {
  const [favs, setFavs] = useState(<></>)
  const state = useSelector((state)=>{return state.bookSlice}) 
  const dispatch = useDispatch() 
  useEffect(() => {
    console.log(state.likedBooks)
    dispatch(clearFavoriteCache())
    
    Object.keys(state.likedBooks).forEach((element) => {
      dispatch(fetchSingleBook(element))
    })
  }, [state.likedBooks])

  function handleClick(elementId){ 
      dispatch(toggleWishlisted(elementId))
  }
  
  useEffect(() => {
    setFavs( state.likedBooksCache.map((element) => {return <Book key={element.id} state={state} element={element} handleClick={handleClick} />}))
    console.log(state.likedBooksCache)
  }, [state.likedBooksCache])


  return (
    <div className="booksHolder">
      {favs}
    </div>
  )
}