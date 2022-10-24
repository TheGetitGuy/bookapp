import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import BookSearch from "./BookSearch.js"
import { fetchBookData, setQueryString, setPage } from "./redux/bookSlice.js"

export default function App() {
  const dispatch = useDispatch() 
  const location = useLocation()
  useEffect(()=>{ //this is used for handling url query keys
    const query = new URLSearchParams(location.search)
    if (query.has('query')){
      dispatch(setQueryString(query.get('query')))
      dispatch(setPage(+query.get('pg')))
      dispatch(fetchBookData(query.get('query')))
    }
  },[])
  return (

    <div>
      <BookSearch />
    </div>
  )
}