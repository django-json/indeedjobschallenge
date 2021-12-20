import React, { useContext } from 'react';
import ReactPaginate from 'react-paginate';

import './jobs.styles.css';

import InputGroup from '../input-group/input-group.component';

import Input from '../input/input.component';
import Button from '../button/button.component';
import CheckBox from '../checkbox/checkbox.component';
import List from '../list/list.component';
import JobsItem from '../jobs-item/jobs-item.component';
import LocationItem from '../location-item/location-item.component';
import Spinner from '../spinner/spinner.component';

import { JobsContext } from '../../providers/jobs/jobs.provider';

// HOC
import WithSpinner from '../with-spinner/with-spinner.component';
// const ListWithSpinner = WithSpinner(List);

const defaultLocations = [
    { id: 0, location: 'London' },
    { id: 1, location: 'Amsterdam' },
    { id: 2, location: 'New York' },
    { id: 3, location: 'Berlin' }
];

function Jobs() {
    const {
        jobs,
        searchValue,
        location,
        isFullTime,
        isFetching,
        handlePageClick,
        handleSearchChange,
        handleSearchClick,
        handleLocationChange,
        toggleIsFullTime
    } = useContext(JobsContext);

    return (
        <div className="jobs">
            <div className="jobs__search">
                <InputGroup>
                    <Input
                        type="text"
                        name="job-title"
                        value={searchValue}
                        placeholder="Title, companies, experties or benefits"
                        startIcon="work_outline"
                        onChange={handleSearchChange}
                    />
                    <Button
                        type="button"
                        name="job-title"
                        text="Search"
                        className="button--primary text-light"
                        onClick={handleSearchClick}
                    />
                </InputGroup>
            </div>
            <div className="jobs__location">
                <CheckBox
                    label="Full time"
                    checked={isFullTime}
                    onChange={toggleIsFullTime}
                />
                <p>Location</p>
                <Input
                    type="text"
                    name="job-location"
                    value={location}
                    placeholder="City, state"
                    startIcon="public"
                    onChange={(event) =>
                        handleLocationChange(event.target.value)
                    }
                />
                <List items={defaultLocations} itemRenderer={LocationItem} />
            </div>
            <div className="jobs__list">
                {!isFetching ? (
                    <>
                        <List items={jobs.jobs} itemRenderer={JobsItem} />
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            pageCount={jobs.page_count}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            breakLinkClassName={'pagination__break-link'}
                            previousLinkClassName={'pagination__link'}
                            nextLinkClassName={'pagination__link'}
                            disabledClassName={'pagination__link--disabled'}
                            activeClassName={'pagination__link--active'}
                        />
                    </>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );
}

export default Jobs;
