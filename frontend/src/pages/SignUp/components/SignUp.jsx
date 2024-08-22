import React, { useState } from 'react';
import Button from '../../../components/Button';
import { GrFormUpload } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';

import '../components/SignUp.scss';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const alert = useAlert();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`https://localhost:3001/auth/signup`, {
        email,
        password
      });

      alert.success("Registrado com sucesso!");

      navigate("/");
    } catch (error) {
      console.error("Erro de requisição:", error.response ? error.response.data : error.message);
      setError("Erro ao Registrar. Tente novamente"); 
    }
  };

  return (
    <div className="sign-up-container">
      <form action="POST" className="form-container">
        <h1 className="title-form">Anime Facts API</h1>
        <p>Create your account</p>

        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="button-sign-up">
          <Button onClick={handleSignUp}>
            SIGN UP <GrFormUpload size={18} cla
            ssName="icon-sign-up"/>
          </Button>
        </div>

        <div className="sign-in">
          <p>Already have an account?</p>
          <Link to={'/'} className="form-link"> SIGN IN</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
