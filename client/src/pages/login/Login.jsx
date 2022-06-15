import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useRef } from "react";
import "./login.css"
import { Context} from"../../context/Context";

export default function Login() {

  const userRef= useRef();
  const passwordRef= useRef();
  const { dispatch, isFetching} = useContext(Context);


  const handleSubmit = async(e) =>{
    e.preventDefault();
    dispatch({ type:"LOGIN_START"});
    try{
      const res= await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type:"LOGIN_SUCCESS", payload: res.data});

    }catch(err){
      dispatch({ type:"LOGIN_FAILURE"});
    }
  };

  return(
      <div className="login">
          <span className="loginTitle">Login</span>
          <form className="loginForm" onSubmit={handleSubmit}>
              <label>Username</label>
              <input className="loginInput" type="text" placeholder="Enter your username..." ref={userRef}/>
              <label>Password</label>
              <input className="loginInput" type="password" placeholder="Enter your pass..." ref={passwordRef}/>
              <button className="loginButton" type="submit" disabled={isFetching}>Login</button>         
          </form>
          <button className="loginRegisterButton">
              <Link className="link" to ="/register">Register</Link>
            </button>
      </div>
  );
}
