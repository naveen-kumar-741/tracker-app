import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommonLayout from '../layouts/CommonLayout/CommonLayout';
import AppProvider from '../providers/AppProvider';
import EventsPage from './EventsPage';
import { ThemeProvider } from '../providers/ThemeProvider';
import StopWatch from './StopWatch';

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/events" />} />
            <Route
              path="/events"
              element={<CommonLayout component={EventsPage} />}
            />
            <Route
              path="/stop-watch"
              element={<CommonLayout component={StopWatch} />}
            />
            <Route
              path="/settings"
              element={<CommonLayout component={StopWatch} />}
            />
            <Route path="*" element={<>Not Found Page</>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
