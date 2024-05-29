import React, { useEffect, useState } from 'react'
import './style.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import {fetchDataFromApi} from '../../utils/api.js'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import noResults from '../../assets/no-results.png'
import {useParams} from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner.jsx'
import MovieCard from '../../components/movieCard/MovieCard.jsx'


const SearchResult = () => {
  const [data, setdata] = useState(null)
  const [pageNum, setpageNum] = useState(1)
  const [loading, setloading] = useState(false)
  
  const {query} = useParams()



  const fetchInitialData = ()=>{
    setloading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res)=>{
      setdata(res)
      setpageNum((pre)=> pre+1)
      setloading(false)
    })
    
  }

  const fetchNextPageData = ()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res)=>{
      if(data?.results){
        setdata({...data, results:[...data?.results , ...res.results]})
      }
      else{
        setdata(res)
      }
      setpageNum((prev)=> prev + 1);
    })
  

  }

  useEffect(()=>{
    setpageNum(1)
    fetchInitialData()
  },[query])

  

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}

      {!loading && (
        <ContentWrapper>
          {data?.results?.length> 0? (
            <>
            <div className="pageTitle">
            

              {`Search ${data?.total_results > 1? "results": 'result'} of ${query}`}
            </div>
            <InfiniteScroll
            className='content'
            dataLength={data?.results.length || []}
            next = {fetchNextPageData}
            hasMore= {pageNum <= data?.total_pages}
            loader = {<Spinner/>}
            >
              {data.results.map((item,index)=>{
                if(item.media_type === "person") return
                return (
                  <MovieCard key={index} data={item} fromSearch={true}/>
                )
              })}
            </InfiniteScroll>
            </>

          ): (
            <span className="resultNotFound"> 
              sorry , result not found 
             </span>
          )}
        </ContentWrapper>
      )}
      
      
    </div>
  )
}

export default SearchResult
