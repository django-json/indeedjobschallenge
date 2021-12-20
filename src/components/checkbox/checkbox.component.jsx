import React from 'react';

import './checkbox.styles.css';

function CheckBox({ label, checked, onChange, className }) {
    return (
        <label className="checkbox">
            <input
                type="checkbox"
                checked={checked}
                id="full_time"
                onChange={onChange}
            />
            Full time
        </label>
    );
}

export default CheckBox;
