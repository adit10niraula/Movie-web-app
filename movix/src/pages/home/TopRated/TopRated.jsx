import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Crousel from '../../../components/crousel/Crousel'

const TopRated = () => {
  const [endpoint, setenpoint] = useState('movie')

  const {data, loading} = useFetch(`/${endpoint}/top_rated`);


  const onTabChange = (tab)=>{
    setenpoint(tab === 'Movies'? "movie": "tv")

  }


  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className="carouselTitle" >
          Top Rated

        </span>
        <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Crousel data={data?.results} loading={loading} endpoint={endpoint}/>
     
    </div>
  )
}

export default TopRated