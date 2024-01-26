import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stadium from './pages/admin/Stadium';
import CreateStadium from './pages/admin/CreateStadium';
import CreateEmployee from './pages/admin/CreateEmployee';
import CreateMatch from './pages/admin/CreateMatch';
import CreateNews from './pages/admin/CreateNews';
import CreateProduct from './pages/admin/CreateProduct';
import CreateSchedule from './pages/admin/CreateSchedule';
import Employee from './pages/admin/Employee';
import Match from './pages/admin/Match';
import News from './pages/admin/News';
import Product from './pages/admin/Product';
import Report from './pages/admin/Report';
import Schedule from './pages/admin/Schedule';
import TicketList from './pages/employee/TicketList';
import Error from './pages/Error';
import Information from './pages/Information';
import Login from './pages/Login';
import MatchDetail from './pages/MatchDetail';
import MatchList from './pages/MatchList';
import Register from './pages/Register';
import Booking from './pages/user/Booking';
import BookingChair from './pages/user/BookingChair';
import History from './pages/user/History';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const { currentUser } = useSelector(state => state.auth);
  console.log('currentUser', currentUser);
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/information' element={<Information />} />
          <Route path='/error' element={<Error />} />
          <Route path='/matchs' element={<MatchList />} />
          <Route path='/matchs/:matchId' element={<MatchDetail />} />
          <Route path='/admin/matchs' element={<Match />} />
          <Route path='/admin/matchs/create' element={<CreateMatch />} />
          <Route path='/admin/matchs/:matchId' element={<CreateMatch />} />
          <Route path='/admin/stadiums' element={<Stadium />} />
          <Route path='/admin/stadiums/create' element={<CreateStadium />} />
          <Route path='/admin/stadiums/:stadiumId' element={<CreateStadium />} />
          <Route path='/admin/employees' element={<Employee />} />
          <Route path='/admin/employees/create' element={<CreateEmployee />} />
          <Route path='/admin/employees/:empId' element={<CreateEmployee />} />
          <Route path='/admin/products' element={<Product />} />
          <Route path='/admin/products/create' element={<CreateProduct />} />
          <Route
            path='/admin/products/:productId'
            element={<CreateProduct />}
          />
          <Route path='/admin/schedules' element={<Schedule />} />
          <Route path='/admin/schedules/create' element={<CreateSchedule />} />
          <Route
            path='/admin/schedules/:scheduleId'
            element={<CreateSchedule />}
          />
          <Route path='/admin/news' element={<News />} />
          <Route path='/admin/news/create' element={<CreateNews />} />
          <Route path='/admin/news/:newsId' element={<CreateNews />} />
          <Route path='/admin/reports' element={<Report />} />
          <Route path='/booking/:matchId' element={<Booking />} />
          <Route path='/booking-chair/:scheduleId' element={<BookingChair />} />
          <Route path='/history' element={<History />} />
          <Route path='/tickets' element={<TicketList />} />
          <Route path='/auth/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<Navigate to='/matchs' replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
