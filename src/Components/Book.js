export default function Book({ state, element, handleClick }) {

  return (
    <div onClick={(e) => {
      e.preventDefault();
      return handleClick(element.id)
    }} className={state.likedBooks[element.id] ? "likedStatus" : ""}>
      <h3 className="bookTitle"> {element.volumeInfo.title}</h3 >
      <img alt={element.volumeInfo.title} src={element.volumeInfo.imageLinks?.thumbnail}></img>
      <div className="bookDescription">
        <span>
          <h5>Publisher: {element.volumeInfo.publisher ? element.volumeInfo.publisher : "N/A"}</h5>
        </span>
        <span>
          {element.volumeInfo.publishedDate ? <h5>Date Published: {element.volumeInfo.publishedDate}</h5> : null}
        </span>
      </div>
      <div className="bottomDescription">
        {element.volumeInfo.description}
      </div>
      <div className="bottomRow">
        {state.likedBooks[element.id] ? <div className="likedStatus">isLiked</div> : null}
      </div>
    </div>)
}