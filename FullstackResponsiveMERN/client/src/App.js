
import { BrowseRouter, Navigate, Routes, Route} from 'react-router-dom'
/* we don't need to prefix 'scenes' with './scenes' since we set up 'jsconfig.json' */
import HomePage from 'scenes/homePage'
import LoginPage from 'scenes/loginPage'
import ProfilePage from 'scenes/profilePage'


function App() {
  return (
    <div className="app">
      <BrowseRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
        </Routes>
      </BrowseRouter>
    </div>
  );
}

export default App;
