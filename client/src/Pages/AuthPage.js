import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'materialize-css';
import {Container,Card,Button,InputGroup,FormControl} from "react-bootstrap";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage();
    const{loading,request,error,clearError}=useHttp();
    const[form,setForm]=useState({email:"",password:""});
    useEffect(()=>{
      if(error){
          message(error)
          clearError()
      }
    },[error,message,clearError])

    const changeHandler = event => {
        setForm({...form,[event.target.name]: event.target.value})
    };
    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register","POST",{...form})
        }catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login","POST",{...form})
            auth.login(data.token,data.userId)
        }catch (e) {}
    }
    return (
        <Container className="align-items-center">
        <Card style={{ width: '28rem' }} className="d-inline-block">
            <Card.Body>
                <Card.Title>REGISTRATION.......................................SIGN IN </Card.Title>
                <InputGroup>
                    <FormControl
                        placeholder="emil"
                        id="email"
                        type="email"
                        name="email"
                        aria-describedby="basic-addon1"
                        onChange={changeHandler}
                    />
                    <FormControl
                        placeholder="Password"
                        id="Password"
                        type="Password"
                        name="password"
                        aria-describedby="basic-addon1"
                        onChange={changeHandler}
                    />
                </InputGroup>
                <Button
                    onClick={loginHandler}
                    disabled={loading}
                >login</Button>
                <Button
                    onClick={registerHandler}
                    disabled={loading}
                >sign up</Button>
            </Card.Body>
        </Card>
    </Container>
    )
};