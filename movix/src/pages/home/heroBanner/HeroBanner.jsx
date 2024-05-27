import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

import useFetch from '../../../hooks/useFetch'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'



const HeroBanner = () => {

    const [background, setbackground] = useState("")
    const [query, setquery] = useState("")
    const navigate = useNavigate()
    const {url} = useSelector((store)=>store.home)

    const {data, loading} = useFetch("/movie/upcoming")
    
    useEffect(()=>{
        const bg =url.backdrop + data?.results?.[Math.floor(Math.random() *20)]?.backdrop_path
        setbackground(bg)

    },[data])



    const searchQueryHandle = (event)=>{
        if(event.key === "Enter" && query.length >0){
            navigate(`/search/${query}`)

        }

    }

  return (
    <div className='heroBanner'>
        {!loading && 
        <div className="backdrop-img">
        <Img src={background} />

    </div>
        }
        <div className="opacity-layer"></div>

        <ContentWrapper>
        
        
            <div className="heroBannerContent">
                <span className="title">Welcome</span>
                <span className="subTitle">Millions of movies, Tv shows and people to discover, explore now</span>
                <div className="searchInput">
                    <input onChange={(e)=>setquery(e.target.value)} onKeyUp={searchQueryHandle} type="text" placeholder='Search for a movie or Tv show ..' />
                    <button>search</button>
                </div>
            </div>

        
        </ContentWrapper>
      
      
    </div>
  )
}

export default HeroBanner
