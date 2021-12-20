import React from 'react';

import Spinner from '../spinner/spinner.component';

function WithSpinner(WrappedComponent) {
    return function ({ isLoading, ...props }) {
        console.log(isLoading);
        return isLoading ? <Spinner /> : <WrappedComponent {...props} />;
    };
}

export default WithSpinner;
