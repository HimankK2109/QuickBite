import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link,NavLink, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("Home")
  const { getTotalCartAmount,token,setToken } = useContext(StoreContext)
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo1} alt="" className='logo ml-2 mt-2'/></Link>
        <ul className="navbar-menu">
            {/* ye naya h kaise # krke hmko navigate kr de rha h to learn */}
            <Link to='/' onClick={() => setMenu("Home")} className={`${menu === "Home"? "active":""} cursor-pointer`}>Home</Link>
            <a href='#explore-menu' onClick={() => setMenu("Menu")} className={`${menu === "Menu"? "active":""} cursor-pointer`}>Menu</a>
            <a href='#app-download' onClick={() => setMenu("Mobile-App")} className={`${menu === "Mobile-App"? "active":""} cursor-pointer`}>Mobile-App</a>
            <a href='#footer' onClick={() => setMenu("Contact Us")} className={`${menu === "Contact Us"? "active":""} cursor-pointer`}>Contact Us</a>
        </ul>
        <div className="navbar-right">
          <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount()===0? "" : "dot"}></div>
          </div>
          {!token? <button onClick={() => setShowLogin(true)}>sign in</button> :
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}> <img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>}
        </div>
    </div>
  )
}

export default Navbar