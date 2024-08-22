import React from 'react'
import Button from '../../../components/Button'
import { GrFormUpload } from "react-icons/gr";

const SignUp = () => {
  return (
    <div className='sign-up-container'>
      <form action="POST" className='form-container'>
        <h1>Anime Facts API</h1>
        <Button >
          SIGN UP <GrFormUpload size={18} className="icon-sign-up"/>
        </Button>
      </form>
    </div>
  )
}

export default SignUp
