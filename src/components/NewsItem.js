import React from 'react'
import PropTypes from 'prop-types'
import DefaultImg from './DefaultImg'

export default function NewsItem (props) {
  
  let {title, author, date, description, imageURL, newsURL, source} = props;
  
  return (
    <div className="card my-3" style={{maxWidth: "20rem"}}>
      <span className="position-absolute top-0 start-80 badge rounded-pill bg-danger">
        {source}
      </span>
      {imageURL && <img src={imageURL} className="card-img-top" alt="ImageHere" style={{maxHeight: "180px"}}/>}
      {!imageURL && <DefaultImg />}

      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">
          <small className="text-muted">
            <em>Author:</em> {author} | <em>Published on:</em> {new Date(date).toLocaleString()}
          </small>
        </p>
        <p className="card-text">
          {description}...
        </p>
        <a href={newsURL} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
      </div>
    </div>
  )
}

NewsItem.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  imageURL: PropTypes.string,
  newsURL: PropTypes.string
}