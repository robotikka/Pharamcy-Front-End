import React, { Component } from 'react'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class TopNavbar extends Component {
    render() {
        return (
              <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Pharmacy</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
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
