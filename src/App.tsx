import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AlertBar from './components/common/AlertBar/AlertBar';
import Navbar from './components/common/Navbar/Navbar';
import CVEditor from './components/pages/CVEditor/CVEditor';
import ResumesManagePage from './components/pages/ResumesManagePage/ResumesManagePage';
import Errors from './components/pages/Errors/Errors';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AlertBar />
      <Routes>
        <Route path="/create" element={<CVEditor />} />
        <Route path="/manage" element={<ResumesManagePage />} />
        <Route path="/errors" element={<Errors />} />
        <Route path="/" element={<Navigate to="/create" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
