import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TransactionDetails from './pages/TransactionDetails';
import BlockDetails from './pages/BlockDetails';

axios.defaults.baseURL = 'http://localhost:4000/api';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />

        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/transaction/:txId" element={<TransactionDetails />} />
            <Route path="/block/:block" element={<BlockDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
