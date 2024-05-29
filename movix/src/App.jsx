import React, { useEffect } from 'react'
import {fetchDataFromApi} from './utils/api.js'
import {useDispatch, useSelector} from 'react-redux'
import { getApiConfiguration, getGenres } from './store/HomeSlice.js'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from  './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import Home from './pages/home/Home.jsx'
import Details from './pages/details/Details.jsx'
import SearchReslt from './pages/searchResult/SearchResult.jsx'
import Eplore from './pages/explore/Explore.jsx'
import PageNotFound from './pages/404/PageNotFound.jsx'
import Explore from './pages/explore/Explore.jsx'


const App = () => {
  const dispatch = useDispatch()

  const url = useSelector((store)=>store.home)


  // const apiconfig = useSelector((st))
  useEffect(()=>{
    apiTesting();
    genresCall()
  },[])


  const apiTesting = ()=>{


  
    fetchDataFromApi('/configuration')
    .then((response)=>{
      const url = {
        backdrop : response.images.secure_base_url + "original",
        poster : response.images.secure_base_url + "original",
        profile : response.images.secure_base_url + "original",
        
      }
      dispatch(getApiConfiguration(url))
    })
  }

  const genresCall = async()=>{
    let promises = []
    let endpoints = ["tv", "movie"]
    let allGenres = {}

    endpoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    
    data.map(({genres})=>{
      return genres.map((item)=> (allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres))
    

  }

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:mediaType/:id" element={<Details/>}/>
        <Route path="/search/:query" element={<SearchReslt/>}/>
        <Route path="/explore/:mediaType" element={<Explore/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    
    </BrowserRouter>
  
  )
}

export default App
