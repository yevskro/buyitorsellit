import React from 'react'
import { NavLink } from 'react-router-dom'
const Header = props => <h1 className="app-title"><NavLink className="buyit_link" to="/items">BuyIt</NavLink> or <NavLink className="sellit_link" to="/items/new">SellIt</NavLink></h1>

export default Header