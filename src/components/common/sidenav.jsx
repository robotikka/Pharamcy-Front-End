import React, { Component } from 'react'
import { Nav, NavText, SideNav } from 'react-sidenav';
import { Link } from 'react-router-dom';

export default class SideNavbar extends Component {
  render() {
    return (
      <div style={{background: '#2c3e50', color: '#FFF', width: 220}}>
        <SideNav highlightColor='black' highlightBgColor='#00bcd4' defaultSelected='sales'>
          <Nav id='dashboard'>
            <NavText><Link to="/">  Home </Link></NavText>
          </Nav>
          <Nav id='sales'>
            <NavText> Sales </NavText>
            <Nav id='list'>
              <NavText><Link to="/about"> List Sales </Link></NavText>
            </Nav>
          </Nav>
          <Nav id='products'>
            <NavText>  Products </NavText>
          </Nav>
        </SideNav>
      </div>
    )
  }
}

