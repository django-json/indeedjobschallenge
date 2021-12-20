import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import JobDetailsPage from './pages/job-details/job-details.component';
import Footer from './components/footer/footer.component';
import ScrollToTop from './components/scroll-to-top/scroll-to-top.component';

import { JobsContext } from './providers/jobs/jobs.provider';

function App() {
    const { jobs } = useContext(JobsContext);

    return (
        <div className="App">
            <div className="App__brand">
                <span className="fw-bold">Indeed</span>
                <span className="fw-light"> Jobs</span>
            </div>
            <ScrollToTop />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route
                    path="/job_details/:id"
                    render={() => <JobDetailsPage jobs={jobs} />}
                />
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
