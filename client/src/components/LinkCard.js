import React from "react";
import {Container} from "react-bootstrap";


export const LinkCard = ({link}) => {
    return(
       <Container>
            <h1>link</h1>
            <p>original link: <a href={link.to}>{link.from}</a></p>
            <p>short link : <a href={link.from}>{link.to}</a></p>
            <p>clicks : <strong>{link.clicks}</strong> </p>
            <p>create date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
       </Container>
    )
}