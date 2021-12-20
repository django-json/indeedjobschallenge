import React, { useContext } from 'react';

import './location-item.styles.css';

import { JobsContext } from '../../providers/jobs/jobs.provider';

const defaultProps = {
    item: [],
    onClick: () => {}
};

function LocationItem({ item }) {
    const { location, setLocation } = useContext(JobsContext);

    return (
        <li
            className="location-item"
            onClick={() => setLocation(item.location)}
        >
            <input
                type="radio"
                name="location-item"
                id={item.id}
                checked={item.location === location}
                value={item.location}
                onChange={() => {}}
                readOnly
            />
            <label htmlFor={item.id}>{item.location}</label>
        </li>
    );
}

Location.displayName = 'LocationItem';
LocationItem.defaultProps = defaultProps;

export default LocationItem;
