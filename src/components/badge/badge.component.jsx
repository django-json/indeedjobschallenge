import React from 'react';
import classNames from 'classnames';

import './badge.styles.css';

function Badge({ type, className }) {
    const classes = classNames('badge', className);
    return type ? <div className={classes}>{type}</div> : <div></div>;
}

export default Badge;
