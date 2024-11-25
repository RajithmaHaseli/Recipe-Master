import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReviewForm from './Components/ReviewForm'
import CommentApp from './Components/CommentApp';
import RecipeList from './Components/RecipeList';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
//import Navbar from './Components/Navbar';
import Noticeboard from './Components/Noticeboard'


function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          
          <Route path="/review" element={<ReviewForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/help" element={<CommentApp />} />
          <Route path='/recipe' element={<RecipeList/>} />
          <Route path='/notice' element={<Noticeboard/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
