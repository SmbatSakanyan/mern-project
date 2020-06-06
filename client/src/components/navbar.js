import React, {useContext, useState} from "react";
import {Navbar, Nav, Button, FormControl, Container, Card} from "react-bootstrap"
import {AuthContext} from "../context/AuthContext";
import{useHistory} from "react-router-dom";
// import {useHttp} from "../hooks/http.hook";





export const NavBar = () => {
        // const {request}= useHttp()

        const auth = useContext(AuthContext);
        const history = useHistory();



        const logouthandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/')
         };
         return(
        <Container>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/create"><img width="30px" src="https://www.festivalclaca.cat/pics/b/3/39911_smiley-face-clipart-png.png" alt=""/></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/create">Create</Nav.Link>
                <Nav.Link href="/links">My Links</Nav.Link>
                {/*<Nav.Link href="/detail">Pricing</Nav.Link>*/}
            </Nav>

            <Button variant="outline-info" onClick={logouthandler}>logout</Button>
        </Navbar>
        </Container>
    )
};