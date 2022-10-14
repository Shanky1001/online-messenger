import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './Pages/ChatPage';
import HomePage from './Pages/HomePage';
import { Store } from './Redux/Store';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' exact element={<HomePage />} />
              <Route path='/chatpage' element={<ChatPage />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </Provider>
    </div>
  );
}

export default App;
