import React from "react";
import "./Input.scss";

const Input = ({ label, value, onChange, onEnterPress }) => {
   const handleKewDown = (e) => {
      if (e.key === 'Enter') {
         onEnterPress();
      }
   }

   return (
      <div className="input-container">
         <input 
            type="text" 
            value={value}  
            className="custom-input"
            onChange={(e) => onChange(e)}
            onKeyDown={(e) => handleKewDown(e)}
         />
        
         {label ? (
            <label className={`${value.length > 0 ? "shrink" : ""}
            input-label`}> 
            {label}
            </label>
         ) : null}
      </div>
   );
};

export default Input;
