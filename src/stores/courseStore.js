import {EventEmitter} from 'events';
import Dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = "change";
let _courses = [];
let _authors = [];

class CourseStore extends EventEmitter {

    //------------------------------------------------
    //Each store must contain the following functions
    //------------------------------------------------

    addChangeListener(callback) {
        //on is provided by eventEmitter
        //How to subscrbe to the store
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        //How to unsubscribe from the store
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    //------------------------------------------------
    //Custom functions that are not required
    //------------------------------------------------

    getCourses() {
        return _courses;
    }

    getCourseBySlug(slug) {
        return _courses.find(course => course.slug === slug);
    }

    getAuthors() {
        return _authors;
    }
}

const store = new CourseStore();

Dispatcher.register(action => {
    switch(action.actionType) {
        case actionTypes.DELETE_COURSE:
            _courses = _courses.filter(course => course.id !== parseInt(action.id, 10));
            store.emitChange();
            break;
        case actionTypes.CREATE_COURSE:
            _courses.push(action.course);
            store.emitChange(); //updates the pages ui
            break;
        case actionTypes.LOAD_COURSES:
            _courses = action.courses;
            store.emitChange(); //updates the pages ui
            break;
        case actionTypes.UPDATE_COURSE:
            _courses = _courses.map(course => course.id === action.course.id ? action.course : course);
            store.emitChange();
            break;
        case actionTypes.LOAD_AUTHORS:
            _authors = action.authors;
            store.emitChange();
            break;
        case actionTypes.CREATE_AUTHOR:
            _authors.push(action.author);
            store.emitChange();
            break;
        default:
            //nothing to do here
    }
})

export default store;