import { Routes, Route } from 'react-router-dom';
import SignIn from "./pages/SignIn/components/SignIn";
import SignUp from "./pages/SignUp/components/SignUp";
import PrivateRoute from "./utils/ProtectedRoutes";
import { AuthProvider } from "./contexts/UserContext";
import Home from "./pages/Home/Home";

const App = () => {
   return (
   <>
     <AuthProvider>
       <Routes>
         <Route path="/" element={<SignIn />} />
         <Route path="/signup" element={<SignUp />} />
         <Route element={<PrivateRoute />}>
            <Route path="/animes" element={<Home />} />
         </Route>
      </Routes>
     </AuthProvider>
   </>
   );
};

export default App;