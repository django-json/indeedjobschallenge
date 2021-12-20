import React from 'react';
import classNames from 'classnames';

import './list.styles.css';

const defaultProps = {
    items: [],
    itemRenderer: null
};

function List({ items, itemRenderer, className, ...props }) {
    const classes = classNames('list', className);
    return (
        <ul className={classes}>
            {items.map((item, index) => {
                //Create id if none
                if (!item.hasOwnProperty('id')) {
                    item.id = index;
                }
                // Create new props for item renderer
                const newProps = Object.assign(
                    { key: item.id },
                    { item },
                    { ...props }
                );
                // Assign props to item renderer
                return React.createElement(itemRenderer, newProps);
            })}
        </ul>
    );
}

List.displayName = 'List';
List.defaultProps = defaultProps;

export default List;
