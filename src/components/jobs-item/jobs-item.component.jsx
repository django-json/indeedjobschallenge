import React from 'react';
import { withRouter } from 'react-router-dom';

import './jobs-item.styles.css';

import Badge from '../badge/badge.component';

function JobsItem({ item, history, match }) {
    // console.log('jobs item: ', item);
    return (
        <li
            className="jobs-item"
            onClick={() => history.push(`${match.url}job_details/${item.id}`)}
        >
            <div className="jobs-item__logo-container">
                {item.company_logo ? (
                    <img
                        className="jobs-item__logo"
                        src={item.company_logo}
                        alt="Company Logo"
                    />
                ) : (
                    <div className="jobs-item__logo jobs-item__logo--not-found">
                        not found
                    </div>
                )}
            </div>
            <div className="jobs-item__details">
                <div className="jobs-item__heading">
                    {item.company_name
                        ? item.company_name
                        : 'Company Not Available'}
                </div>
                <div className="jobs-item__title">{item.job_title}</div>
                <div className="jobs-item__footer">
                    <Badge type={item.job_type} />
                    <div className="jobs-item__row">
                        <div className="jobs-item__col">
                            <i className="material-icons">public</i>
                            <span>{item.full_location}</span>
                        </div>
                        <div className="jobs-item__col">
                            <i className="material-icons">schedule</i>
                            <span> {item.days_ago}</span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default withRouter(JobsItem);
