import React from 'react';
import classNames from 'classnames';

import './button.styles.css';

function Button({ type, text, disabled, className, onClick }) {
    const classes = classNames('button', className, {
        'button--disabled': disabled
    });
    return (
        <button
            className={classes}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;

Button.defaultProps = {
    text: 'Default'
};
