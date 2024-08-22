import Animes from "./components/Animes";
import { Routes, Route} from 'react-router-dom'
import SignIn from "./pages/SignIn/components/SignIn";
import SignUp from "./pages/SignUp/components/SignUp";

const App = () => {
   return (
   <>
      <Routes>
         <Route path="/" element={<SignIn />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/animes" element={<Animes />} />
      </Routes>
   </>
   );
}

export default App;