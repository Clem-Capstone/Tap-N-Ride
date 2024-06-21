import React from 'react'
import './css/header.css'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Nav from './Nav'

function Header(){
    return(
        <header id='header' className = 'header fixed-top d-flex alight-items-center'>
            {/* {logo} */}
            <Logo />
            {/* {search} */}
            <SearchBar />
            {/* {nav} */}
            <Nav />
        </header>
    )
}

export default Header;