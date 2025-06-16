import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Home from './pages/Home';
  import ListingDetail from './pages/ListingDetail';

  function App() {
    return (
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
          </Routes>
        </div>
      </Router>
    );
  }

  export default App;