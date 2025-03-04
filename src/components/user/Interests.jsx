import React from 'react'
import { Link } from 'react-router-dom'

const Interests = () => {
    return (
        <div className="p-8 pt-0">
        <h1 className="p-4 text-2xl font-semibold font-sans">Interests</h1>
    
        {/* Scrollable container */}
        <div className="ps-4 flex overflow-x-auto no-scrollbar gap-10 whitespace-nowrap scroll-smooth">
            
            {/* Cards */}
            <Link to={'/product/interests/culture'} className="h-72 min-w-72 bg-black text-white flex items-center justify-center text-2xl"  style={{backgroundImage:"url('../public/images/culture.jpg')",backgroundSize: "cover", backgroundPosition: "center"}}>
            <h1 className=''>Culture</h1>
            </Link>
            <Link to={'/product/interests/movies'} className="h-72 min-w-72 bg-black text-white flex items-center justify-center text-2xl" style={{backgroundImage:"url('../public/images/culture1.jpg')",backgroundSize: "cover", backgroundPosition: "center"}}>
            Movies
            </Link>
            <Link to={'/product/interests/sports'} className="h-72 min-w-72 bg-black text-white flex items-center justify-center text-2xl">
            Sports
            </Link>
            <Link to={'/product/interests/anime'} className="h-72 min-w-72 bg-black text-white flex items-center justify-center text-2xl">
            Anime
            </Link>
            <Link to={"/product/interests/music"} className="h-72 min-w-72 bg-black text-white flex items-center justify-center text-2xl">
            Music
            </Link>
        </div>
    </div>
    
    )
}

export default Interests
