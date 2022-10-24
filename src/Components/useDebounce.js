import {useEffect, useState, useCallback} from "react" 

export default function useDebounce(timeToDelay){
  const [timer, setTimer] = useState() 
  const debounce = (cbFunc)=>{setTimer(setTimeout(()=>{cbFunc()}, timeToDelay))}
  useEffect(()=>{
    return( ()=>{ clearTimeout(timer) } )
  },[timer])
  
  return [debounce, timer]
}