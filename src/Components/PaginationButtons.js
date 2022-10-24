import { useEffect, useState } from "react" 
//I have no idea if theres a better way to manage these buttons.

const PaginationButtons = ({dispatch, page, setPage, largestPage, clickAction})=>{ 
    const [middleButton, setMiddleButton] = useState(4)
    const buttonsArray =[
        (page>3)?'...':2,
        (middleButton-1),
        middleButton,
        (middleButton+1),
        (page < largestPage-3)?'...':(largestPage-1),
    ] 

    function navigationClickHandler(action, optionalPayload=null) {
        if(optionalPayload === '...'){return}
            dispatch(action(optionalPayload));
            clickAction();
            window.scrollTo(0, 0)
        
    }
    useEffect(()=>{
        if (page>3 && page<largestPage-2){
        setMiddleButton(page)}
        if (page <= 3){
        setMiddleButton(4)}
        if (page >= largestPage-2){
        setMiddleButton(largestPage-3)}
      },[page])
    return(
    <div className="navigationButtonsContainer navButtons"> 
    <button disabled={+page === 1} className="navButtons" onClick={() => { navigationClickHandler(()=>setPage(1)) }}>
       1
    </button>
    <button disabled={+page === 1} className="navButtons" onClick={() => { navigationClickHandler(()=>setPage((page - 1))) }}>
       {'<-'}
    </button>
    {buttonsArray.map((arritem)=>{return(
    <button disabled={(+page === arritem)} className="navButtons" onClick={() => { navigationClickHandler(setPage, arritem) }}>
       {arritem}
    </button>)

    })}
    <button disabled={+page >= largestPage} className="navButtons" onClick={() => { navigationClickHandler(()=>setPage((page + 1))) }}>
       {'->'}
    </button>
    <button disabled={+page >= largestPage} className="navButtons" onClick={() => { navigationClickHandler(()=>setPage(largestPage)) }}>
       {largestPage}
    </button>
    </div> 
    )
}
export default PaginationButtons