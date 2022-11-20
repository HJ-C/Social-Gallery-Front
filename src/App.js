import './App.css';
import './components/postReg/upload.css'
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import './components/Login/login.css'
import './components/Main/main.css'
import { Routes, Route } from 'react-router-dom'
import UpLoad from './components/postReg/Upload';
import Movie from './components/sideMenu/Movie';
import Broadcast from './components/sideMenu/Broadcast';
import Life from './components/sideMenu/Life';
import Travel from './components/sideMenu/Travel';
import PrivacyPolicy from './components/Login/PrivacyPolicy';
import UserInfo from './components/Main/UserInfo';


function App() {

    return (
        <div className="App">
            
            <Routes>
                {/* Main */}
                <Route exact path="/" element={<Main ></Main>}></Route>
                <Route path="/:pid" element={<Main></Main>}></Route>
                <Route path="/upload" element={<UpLoad></UpLoad>}></Route>

                {/* UserInfo */}
                <Route exact path="/userinfo" element={<UserInfo></UserInfo>}></Route>

                {/* Login */}
                <Route path="/login/" element={<Login></Login>}></Route>
                <Route path="/login/:location" element={<Login></Login>}></Route>
                <Route path="/login/privacy" element={<PrivacyPolicy></PrivacyPolicy>}></Route>

                {/* SideMenu */}
                <Route path="/movie" element={<Movie></Movie>}></Route>
                <Route path="/broadcast" element={<Broadcast></Broadcast>}></Route>
                <Route path="/life" element={<Life></Life>}></Route>
                <Route path="/travel" element={<Travel></Travel>}></Route>
            </Routes>
        </div>
    );
}

export default App;