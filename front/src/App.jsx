import { Routes, Route } from 'react-router-dom';
import Login from './login';
import SignUp from './signup';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<SignUp />} />
      
          </Routes>
  );
};

export default App;
