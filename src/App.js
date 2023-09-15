import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutIconLink from './components/AboutIconLink';
import AboutPage from './pages/AboutPage';
import { FeedbackProvider } from './context/FeedbackContext';
import Card from './components/shared/Card';

import { Link } from 'react-router-dom';

function App() {


  return (
    <FeedbackProvider>
      <Router>
      <Link to='/'><Header /></Link>
        <div className='container'>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                  <Card className="reverse">
                    <p>There is no backend in Version 1.0.0,
                      so your reviews will disappear with page reload.
                      This is for demo purposes only, as of now.</p>
                    <p>Future versions will allow for data storage,
                      among other features.</p>
                    <p>Come back for updates! And thanks for visiting :)</p>
                  </Card>
                </>
              }
            ></Route>

            <Route path='/about' element={<AboutPage />} />
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  )
}

export default App