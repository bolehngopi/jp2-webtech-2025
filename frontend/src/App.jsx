import { Route, Routes } from 'react-router';
import Login from './views/Login';
import DefaultLayout from './components/DefaultLayout';
import Home from './views/Home';
import Schedule from './views/Schedule';
import Department from './views/referensi/Department';
import Doctor from './views/referensi/Doctor';

function App() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/department' element={<Department />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
