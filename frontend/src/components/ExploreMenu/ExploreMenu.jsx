import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1 className='text-3xl font-bold ml-2'>Explore Our Menu</h1>
        <p className='explore-menu-text ml-2 text-xl'>Our mission is to satisfy your cravings 
            and elevate your dining experience, one delicious meal at a time
        </p>
        <div className='explore-menu-list'>
            {menu_list.map((item, index) => {
                return (
                    // we get a functionality like if we click again on salad we get back to all condition mtlb wo uncheck ya unselect ho ja rha h
                    <div onClick={() => setCategory((prev) => (prev===item.menu_name?"All":item.menu_name))} className='explore-menu-list-item' key={index}>
                        <img className={category===item.menu_name ? "active": ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu