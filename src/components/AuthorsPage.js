import React, {useState, useEffect} from 'react';
import courseStore from '../stores/courseStore';
import * as courseActions from '../actions/courseActions';

function AuthorsPage() {
    const [authors, setAuthors] = useState(courseStore.getAuthors());
    const [author, setAuthor] = useState('');


    useEffect(() => {
        courseStore.addChangeListener(onChange);
        if(authors.length === 0) {
            courseActions.loadAuthors();
        }
        return () => courseStore.removeChangeListener(onChange);
    }, [authors.length]);

    function onChange() {
        setAuthors(courseStore.getAuthors());
    }

    function handleChange(event) {
        setAuthor(event.target.value);
    }

    function handleNewAuthor() {
        if(author.length !== 0) {
            courseActions.createAuthor({name:author});
            setAuthor("");
        }
    }

    return (
        <div>
            <h1>Authors Page</h1>
            <div style={{display: 'flex'}}>
                <div className="form-group">
                    <div className="field">
                    <input
                        id="author"
                        type="text"
                        name="author"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="New Author"
                        value={author}
                    />
                    </div>
                </div>
                <div className="btn btn-primary" style={{height: '80%', marginLeft: '10px'}} onClick={() => handleNewAuthor()}>Create</div>
            </div>
            <h2>Current Authors</h2>
            {/* No idea why a new author does not get rendered after clicking the Create button */}
            {authors.map(author => {
                return <p key={author.id}>{author.name}</p>
            })}
        </div>
    )
}

export default AuthorsPage;