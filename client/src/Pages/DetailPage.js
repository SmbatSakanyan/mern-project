import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useParams} from "react-router-dom";
import {LinkCard} from "../components/LinkCard";
import {Container} from "react-bootstrap";


export const DetailPage = () => {
    const [link,setLink] = useState([])
    const {loading,request} =useHttp()
    const {token} = useContext(AuthContext)
    const linkId = useParams().id

    const getLink = useCallback(async () =>{
        try{
          const fetched = await request(`/api/link/${linkId}`,"GET",null,{Authorization: `Bearer ${token}`})
            setLink(fetched)
        }catch (e) {}
    },[token,request,linkId])

    useEffect(() =>{
        getLink()
    },[getLink])

    if(loading){
        return (
            <Container>
                <h1>loading</h1>
            </Container>
        )
    }

    return (
        <LinkCard
        link={link}
        />
    )
};