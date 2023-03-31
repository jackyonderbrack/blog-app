import './App.css';
import Main from './pages/Main';
import AddEvent from './pages/AddEvent';
import Event from './pages/Event';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/add-event' element={<AddEvent />}/>
        <Route path='Articles/:id' element={<Event />}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
