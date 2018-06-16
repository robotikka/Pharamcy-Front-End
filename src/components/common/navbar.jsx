import React, { Component } from 'react'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class TopNavbar extends Component {
    render() {
        return (
              <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/" id="PharmacyLiink">Pharmacy</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav pullRight>
                        <NavItem id="LoggedUser">
                            Not Logged in
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <Navbar.Brand>
                            
                            <Link to="/login">
                                Login
                            </Link>
                            </Navbar.Brand>
                    </Nav>
                    <Nav pullRight>
                        <NavItem>
                            Home
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
              </Navbar>
        )
    }
}
