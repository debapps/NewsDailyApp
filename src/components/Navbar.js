import React, {useState} from 'react'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

export default function Navbar (props) {

    const [searchText, setSearchText] = useState("Search...");

    const handleSearchText = (event) => {
        setSearchText(event.target.value);
    }

    const handleSearchClick = () => {
        setSearchText("");
    } 

    const getSearchText = () => {
        props.queryStr(searchText); 
        setSearchText("Search...");  
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">NewsDaily</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/business">Business</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/entertainment">Entertainment</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sports">Sports</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/health">Health</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/science">Science</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/technology">Technology</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" 
                            type="search" 
                            aria-label="Search"
                            value={searchText}
                            onChange={handleSearchText}
                            onClick={handleSearchClick}/>
                        <Link className="btn btn-outline-light" 
                            to="/search"
                            onClick={getSearchText}>
                            Search
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    )

}

Navbar.propType = {
    queryStr: PropTypes.func
}