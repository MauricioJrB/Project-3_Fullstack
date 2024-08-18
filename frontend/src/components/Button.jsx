import "./Button.scss";

const Button = ({onClick, children}) => {
   return (
      <div className="button-container" onClick={onClick}>
         {children}
      </div>
   );
};

export default Button;