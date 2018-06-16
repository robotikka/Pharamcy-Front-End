import React, { Component } from 'react'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class TopNavbar extends Component {
    logout(e){
        
        
        document.getElementById("LoggedUser").innerHTML=  "<font color=red>Not Logged In</font>";
        document.getElementById("navPaneLeft").hidden = true;
        document.getElementById("PharmacyLiink").hidden = true;
        document.getElementById("logged").textContent = "Login";
        window.location.href = "http://localhost:3000/login"
        document.getElementById("loginDIV").hidden = false;

        e.preventDefault();
    }
    render() {
        return (
              <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/" id="PharmacyLiink" hidden>Pharmacy</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav pullRight>
                        <NavItem id="LoggedUser">
                            <font color="red">Not Logged in</font>
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <Navbar.Brand>
                            
                            <Link to="/login" id="logged" onClick={this.logout.bind(this)}>
                                Login
                            </Link>
                            </Navbar.Brand>
                    </Nav>
                    <Nav pullRight hidden>
                        <NavItem>
                            Home
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
              </Navbar>
        )
    }
}
