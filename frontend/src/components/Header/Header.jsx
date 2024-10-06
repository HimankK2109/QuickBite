import React from 'react'
import './Header.css'

const Header = ({ menuRef }) => {
  const onClickHandler = () => {
    menuRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p className='text-3xl text-gray-400'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest
                ingredients and culinary experience.
            </p>
            <button onClick={onClickHandler}>View Menu</button>
        </div>
    </div>
  )
}

export default Header