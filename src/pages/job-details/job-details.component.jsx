import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import './job-details.styles.css';

import Badge from '../../components/badge/badge.component';
import Spinner from '../../components/spinner/spinner.component';

import JobsContext from '../../providers/jobs/jobs.provider';

function JobDetailsPage({ jobs, match }) {
    console.log(jobs);
    function renderJobDetailsPage() {
        //Add id if jobs[x].id doesn't exist.
        jobs.jobs.forEach((job, index) => {
            if (!job.id) {
                jobs.jobs[index].id = index;
            }
        });
        const id = match.params.id;
        const job = jobs.jobs.filter((job) => job.id === Number(id))[0];
        return (
            <div className="job-details-page">
                <div className="job-details-page__col">
                    <div className="job-details-page__back">
                        <Link to="/" className="job-details-page__link">
                            Back to search
                        </Link>
                        <i className="material-icons">trending_flat</i>
                    </div>
                    <div className="job-details-page__apply">
                        <h3>How to apply</h3>
                        <div className="job-details-page__site">
                            Please go to the main site:{' '}
                            <a target="_blank" rel="noreferrer" href={job.url}>
                                {job.url}.
                            </a>
                        </div>
                    </div>
                </div>
                <div className="job-details-page__col">
                    <div className="job-details-page__heading">
                        <div className="job-details-page__name-wrapper">
                            <div className="job-details-page__name">
                                {job.job_title}
                            </div>
                            <Badge className="my-2" type={job.job_type} />
                        </div>
                        <div className="job-details-page__publication-date d-flex align-items-center mb-4">
                            <i className="material-icons">schedule</i>
                            <span className="mx-2">{job.days_ago}</span>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex">
                            <div>
                                {job.company_logo && (
                                    <img
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            marginRight: '10px'
                                        }}
                                        src={job.company_logo}
                                        alt="Company Logo"
                                    />
                                )}
                            </div>
                            <div>
                                <div className="job-details-page__company">
                                    {job.company_name}
                                </div>
                                <div className="job-details-page__location">
                                    <i className="material-icons">public</i>
                                    <span className="mx-2">
                                        {job.full_location}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="job-details-page__contents">
                            {ReactHtmlParser(job.html_description)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    //Object not empty?
    if (Object.keys(jobs).length !== 0) {
        return renderJobDetailsPage();
    } else {
        return <Spinner />;
    }
}

export default withRouter(JobDetailsPage);
