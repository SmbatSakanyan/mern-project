import React from "react";
import {Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

export const LinksList = ({links}) =>{
    return(
        <Container>
        <Table >
            <thead>
            <tr>
                <th>N</th>
                <th>Original Link</th>
                <th>Shorted Link</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {links.map((link,index) => {
                return(
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td><Link to={`/detail/${link._id}`}>Open</Link></td>
                    </tr>
                )
                }
            )
            }
            </tbody>
        </Table>
        </Container>
    )
}