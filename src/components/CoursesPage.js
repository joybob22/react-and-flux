import React, { useState, useEffect } from 'react';
import courseStore from '../stores/courseStore';
import CourseList from "./CourseList";
import { Link } from 'react-router-dom';
import {loadCourses, deleteCourse, loadAuthors} from '../actions/courseActions';

function CoursesPage() {

    // useState is how we work with state in a function component.
    // useState expects one parameter which will be the default value of the item in state.
    // useState will return two items. First the item in state (Here an empty array will be assigned to courses)
    // Second it will return a setter function that we can use to update the item in state.

    const [ courses, setCourses ] = useState(courseStore.getCourses());
    const [ authors, setAuthors ] = useState(courseStore.getAuthors());


    // useEffect is componentDidMount, componentDidUpdate and componentWillUnmount all in one!
    // Can only be used in function componenets
    // The first parameter is a function it will call
    // The second parameter is an array of values that when updated the useEffect function will be called.
    // Having an empty array will have useEffect just run once (componentDidMount)

    useEffect(() => {
            courseStore.addChangeListener(onChange);
            if(courseStore.getCourses().length === 0) {
                loadCourses();
            }
            if(courseStore.getAuthors().length === 0) {
                loadAuthors();
            }
            return () => courseStore.removeChangeListener(onChange); // cleanup on unmount (navigate to a different page)
        }, []);
        
    function onChange() {
        setCourses(courseStore.getCourses());
        setAuthors(courseStore.getAuthors());
    }


        return (
        <>
            <h2>Courses</h2>
            <Link className="btn btn-primary" to="/course">Add Course</Link>
            <CourseList deleteCourse={deleteCourse} courses={courses} authors={authors}/>
        </>
        );
    }


export default CoursesPage;