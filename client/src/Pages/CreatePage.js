import React, {useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Container, FormControl} from "react-bootstrap";





export const CreatePage = () => {
    const auth = useContext(AuthContext);
    const history = useHistory()
    const{request} = useHttp()
    const[link,setLink]=useState('');



    const pressHandler = async event => {
        if(event.key === "Enter"){
            try{
             const data = await request('/api/link/generate','POST',{from: link},{Authorization: `Bearer ${auth.token}`})
              history.push(`/detail/${data.link._id}`)
                console.log(data.link._id)
            }catch (e) {}
        }
    }


    return(
        <Container>
            <FormControl
            placeholder="put link"
            id="link"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}

            />
        </Container>

    )
}

