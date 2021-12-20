import React, { createContext, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import { APIManager } from '../../api/APIManager';

export const JobsContext = createContext({
    jobs: [],
    searchValue: '',
    location: '',
    isFullTime: false,
    isFetching: true,
    setLocation: () => {},
    handleSearchClick: () => {},
    handleSearchChange: () => {},
    handleLocationChange: () => {},
    handlePageClick: () => {},
    toggleIsFullTime: () => {}
});

function JobsProvider({ children }) {
    const [jobs, setJobs] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [location, setLocation] = useState('New York');
    const [isFullTime, setIsFullTime] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const starting_page = 1;
    const debouncedQuery = useDebounce(location, 1000);

    useEffect(() => {
        async function fetchJobs() {
            setIsFetching(true);
            const jobs = await getJobs(searchValue, starting_page, location);
            setJobs(jobs);
            setIsFetching(false);
        }
        fetchJobs();
    }, []);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
        } else {
            async function filterJobsByJobType() {
                try {
                    setIsFetching(true);
                    const jobType = isFullTime ? 'fulltime' : '';
                    const search_query = searchValue
                        ? searchValue
                        : 'Web Developer';
                    const search_location = location ? location : 'New York';
                    const jobs = await APIManager.fetchJobsByJobType(
                        search_query,
                        starting_page,
                        search_location,
                        jobType
                    );
                    setJobs(jobs);
                    setIsFetching(false);
                } catch (error) {
                    console.log(error);
                }
            }
            filterJobsByJobType();
        }
    }, [isFullTime]);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
        } else {
            async function fetchJobsByLocation() {
                setIsFetching(true);
                const jobs = await getJobs(
                    searchValue,
                    starting_page,
                    location
                );
                setJobs(jobs);
                setIsFetching(false);
            }
            fetchJobsByLocation();
        }
    }, [debouncedQuery]);

    function useDebounce(value, delay) {
        // State and setters for debounced value
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(
            () => {
                // Set debouncedValue to value (passed in) after the specified delay
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                }, delay);

                // Return a cleanup function that will be called every time ...
                // ... useEffect is re-called. useEffect will only be re-called ...
                // ... if value changes (see the inputs array below).
                // This is how we prevent debouncedValue from changing if value is ...
                // ... changed within the delay period. Timeout gets cleared and restarted.
                // To put it in context, if the user is typing within our app's ...
                // ... search box, we don't want the debouncedValue to update until ...
                // ... they've stopped typing for more than 500ms.
                return () => {
                    clearTimeout(handler);
                };
            },
            // Only re-call effect if value changes
            // You could also add the "delay" var to inputs array if you ...
            // ... need to be able to change that dynamically.
            [value]
        );

        return debouncedValue;
    }

    function toggleIsFullTime() {
        setIsFullTime(!isFullTime);
    }

    async function getJobs(searchValue, page, location) {
        console.log('Fetching jobs from origin...');
        const search_query = searchValue ? searchValue : 'Web Developer';
        const search_location = location ? location : 'New York';

        try {
            const jobs = APIManager.fetchJobs(
                search_query,
                page,
                search_location
            );
            return jobs;
        } catch (error) {
            console.log(error);
        }
    }

    async function handlePageClick({ selected: selectedPage }) {
        //React Paginate page start at 0
        //API page start at 1
        const page = selectedPage + 1;
        const jobs = await getJobs(searchValue, page, location);
        setJobs(jobs);
    }

    function handleSearchChange(e) {
        const searchValue = e.target.value;
        setSearchValue(searchValue);
    }

    async function handleSearchClick() {
        if (searchValue) {
            const jobs = await getJobs(searchValue, starting_page, location);
            setJobs(jobs);
        }
    }

    const handleLocationChange = (location) => {
        setLocation(location);
    };

    return (
        <JobsContext.Provider
            value={{
                jobs,
                searchValue,
                location,
                isFullTime,
                isFetching,
                setLocation,
                handlePageClick,
                handleSearchClick,
                handleSearchChange,
                handleLocationChange,
                toggleIsFullTime
            }}
        >
            {children}
        </JobsContext.Provider>
    );
}

export default JobsProvider;
