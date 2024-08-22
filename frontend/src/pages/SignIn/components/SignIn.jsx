import React, { useContext, useState } from 'react'
import { GrFormUpload } from 'react-icons/gr'
import Button from '../../../components/Button'
import { Link, useNavigate } from 'react-router-dom'

import '../components/SignIn.scss'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { AuthContext } from '../../../contexts/UserContext'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const alert = useAlert();
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();

     try {
      const { data } = await axios.post(`https://localhost:3001/auth/signin`, {
        email,
        password
      });

      login(data.token);

      alert.success("Logado com sucesso!");

      navigate("/animes");
    } catch (error) {
      console.error("Erro de requisição:", error.response ? error.response.data : error.message);
      setError("Erro ao Logar. Tente novamente"); 
    }
  }

  return (
    <div className="sign-in-container">
      <form action="POST" className="form-container">
        <h1 className="title-form">Anime Facts API</h1>
        <p>Enter your credentials to access your account</p>
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

        <div className="button-sign-in">
          <Button onClick={handleSignIn}>
            SIGN IN <GrFormUpload size={18} className="icon-sign-up"/>
          </Button>
        </div>

        <div className="sign-in">
          <p>Already have an account?</p>
          <Link to={'/signup'} className="form-link"> SIGN UP</Link>
        </div>
      </form>
    </div>
  )
}

export default SignIn
