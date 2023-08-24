import Google from "../img/google.png";
import { useState } from "react";
import Facebook from "../img/facebook.png";
import Apple from "../img/apple.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const google = () => {
    window.open("http://localhost:3000/login/google", "_self");
  };

  const apple = () => {
    window.open("http://localhost:3000/login/apple", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:3000/login/facebook", "_self");
  };

  const handleLogin=()=>{
    console.log("loginging")
  }

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <Link className="left link">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton apple" onClick={apple}>
            <img src={Apple} alt="apple" className="icon" />
            Apple
          </div>
          <Link className="loginButton register link" to="/register">
            Register
          </Link>
        </Link>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="text" placeholder="Username" />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} required type="text" placeholder="Password" />
          <button className="submit" onClick={()=>handleLogin()} >Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
