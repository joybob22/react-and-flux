import React from 'react';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Header from './common/Header';
import CoursesPage from './CoursesPage';
import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import ManageCoursePage from './ManageCoursePage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


    return (
    <div className="container-fluid">
        <ToastContainer autoClose={3000} hideProgressBar />
        <Header />
        {/* Wrapping switch around all routes will ensure only one route is displayed at a time. */}
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/courses" component={CoursesPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/course/:slug" component={ManageCoursePage} />
            <Route path="/course" component={ManageCoursePage} />
            <Redirect from="/about-page" to="about" />
            <Route component={NotFoundPage} />
        </Switch>

    </div>
    )
}

export default App;