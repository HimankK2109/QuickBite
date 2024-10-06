import React, { useState, useRef } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import GForm from '../../components/GForm/GForm'

const Home = () => {
    const [category, setCategory] = useState("All")
    const menuRef = useRef(null);
  return (
    <div>
        <Header menuRef={menuRef} />
        <div ref={menuRef}>
          <ExploreMenu category={category} setCategory={setCategory}/>
        </div>
        <FoodDisplay category={category}/>
        <GForm />
        <AppDownload />
    </div>
  )
}

export default Home