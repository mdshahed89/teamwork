import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Right from './components/DashboardComponents/Right';
import Profile from './components/DashboardComponents/Profile';
import Balance from './components/DashboardComponents/Balance';
import Work from './components/DashboardComponents/Work';
import Referrel from './components/DashboardComponents/Referrel';
import Faq from './components/DashboardComponents/Faq';
import Leaderboard from './components/DashboardComponents/Leaderboard';
import Overview from './components/DashboardComponents/Overview';
import { useSelector } from 'react-redux';

export default function App() {

  const { currentUser } = useSelector((state) => state.user);
  
  console.log(currentUser);

  return (
    <BrowserRouter>
      {/* header */}
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          {/* <Route path='/profile' element={<Profile />} /> */}
          <Route path='/dashboard' element={<Dashboard />} >
          <Route path='/dashboard/' element={<Overview />} />
          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/dashboard/balance' element={<Balance />} />
          <Route path='/dashboard/work' element={<Work />} />
          <Route path='/dashboard/refferel' element={<Referrel />} />
          <Route path='/dashboard/leaderboard' element={<Leaderboard />} />
          <Route path='/dashboard/faq' element={<Faq />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
