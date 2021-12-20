import React from 'react';
import classNames from 'classnames';

import './input.styles.css';

function Input({
    startIcon,
    type,
    name,
    placeholder,
    value,
    onChange,
    className
}) {
    const classes = classNames('input', className);

    return (
        <div className={classes}>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            {startIcon && <i className="material-icons">{startIcon}</i>}
        </div>
    );
}

export default Input;

Input.defaultProps = {
    value: '',
    placeholder: '',
    onChange: () => {}
};
