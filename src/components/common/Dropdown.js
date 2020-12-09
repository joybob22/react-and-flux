import React from 'react';
import PropTypes from 'prop-types';

function Dropdown(props) {
    
    return (
        <div className="form-group">
        <label htmlFor={props.id}>{props.label}</label>
        <div className="field">
          <select
            id={props.author}
            name={props.name}
            value={props.defaultValue}
            className="form-control"
            onChange={props.onChange}
          >
            {props.options.map(option => {
              return <option key={option.id} value={option.id}>{option.name}</option>
            })}
          </select>
        </div>
      </div>
    )
}

Dropdown.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.any.isRequired
}

export default Dropdown;