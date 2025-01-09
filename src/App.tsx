import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QrCodeGenerator from './QrCodeGenerator';
import QrCodePage from './QrCodePage';

const App = () => {
  return (
    <Router>
      <div className="h-screen flex justify-center items-center relative">
        <div className="w-full h-screen absolute top-0 -z-10">
          <img
<<<<<<< HEAD
            src="./public/qa-bg.jpg"
=======
            src="assets/qa-bg.jpg"
>>>>>>> e8d5bbfe4c046715dae6850d7e3c27fa2fca5433
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <Routes>
          <Route path="/" element={<QrCodeGenerator />} />
          <Route path="/qrcode" element={<QrCodePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
