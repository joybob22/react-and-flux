import React, {useState, useEffect} from 'react';
import { Prompt } from 'react-router-dom';
import CourseForm from './CourseForm';
import courseStore from '../stores/courseStore';
import { toast } from 'react-toastify';
import * as courseActions from '../actions/courseActions';

const ManageCoursePage = props => {
    const [errors, setErrors] = useState({});
    const [authors, setAuthors] = useState(courseStore.getAuthors());
    const [courses, setCourses] = useState(courseStore.getCourses());
    const [ course, setCourse ] = useState({
        id: null,
        slug: '',
        title: '',
        authorId: null,
        category: ''
    });

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        const slug = props.match.params.slug;
        if(courses.length === 0) {
            courseActions.loadCourses();
            courseActions.loadAuthors();
        }else if(slug) {
            setCourse(courseStore.getCourseBySlug(slug));
        }
        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length, props.match.params.slug]);

    function onChange() {
        setCourses(courseStore.getCourses());
    }

    function handleChange(event) {
        //The spread operator can give you a copy of an object
        //The second parameter will change a property of that object in the copy
        const updatedCourse = {...course, [event.target.name]: event.target.value};
        setCourse(updatedCourse);
    }

    function formIsValid() {
        const _errors = {};

        if(!course.title) _errors.title = "Title is requried";
        if(!course.authorId) _errors.authorId = "Author ID is requried";
        if(!course.category) _errors.category = "Category is requried";

        setErrors(_errors);
        //Form is valid if the errors object has no properties
        //Object.keys returns an error of the keys of an object
        return Object.keys(_errors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!formIsValid()) return;
        courseActions.saveCourse(course).then(() => {
            //A way to perform a redirect
            props.history.push("/courses");
            toast.success("Course saved.")
        })

    }
    let notFound = true;
    return (
        <>
        {notFound = true}
            <h2>Manage Course</h2>
            {/* Here is an example of prompting a user when they navigate away from the page. */}
            {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
            {courses.map(course => {
                if(course.slug === props.match.params.slug) {
                    notFound = false;
                    console.log(course);
                    return <CourseForm key={course.id} course={course} onChange={handleChange} onSubmit={handleSubmit} errors={errors} />
                }
            })}
            {notFound ? <div>Course not found....</div> : <></>}
        </>
    )
}

export default ManageCoursePage;