import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("resgister",name,email,password);
  };

  return (
    <div className="right">
      <input value={email} onChange={(e)=>setEmail(e.target.value)}  required type="text" placeholder="Email" />
      <input value={name} onChange={(e)=>setName(e.target.value)} required type="text" placeholder="Name" />
      <input value={password} onChange={(e)=>setPassword(e.target.value)} required type="text" placeholder="Password" />
      <button className="submit" onClick={() => handleRegister()}>
        Register
      </button>
    </div>
  );
};

export default Register;
