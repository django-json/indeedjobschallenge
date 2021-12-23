import React, { createContext, useState, useEffect } from 'react';

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
    const [isFetching, setIsFetching] = useState(false);
    const debouncedLocation = useDebounce(location, 1000);

    useEffect(() => {
        async function fetchJobs() {
            setIsFetching(true);
            /* Function: getJobs
               Parameters: Object
               Properties:
                    search_query: required
                    page: required
                    location: optional
                    job_type: optional
            */
            const jobs = await getJobs({
                location: debouncedLocation,
                job_type: isFullTime
            });
            setJobs(jobs);
            setIsFetching(false);
        }
        fetchJobs();
    }, [debouncedLocation, isFullTime]);

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

    async function getJobs({
        search_query = searchValue ? searchValue : 'Web Developer',
        page = 1,
        debounced_location = location,
        job_type = isFullTime
    }) {
        console.log('Fetching jobs from origin...');

        try {
            const jobs = await APIManager.fetchJobs({
                search_query,
                page,
                location: debounced_location,
                job_type: job_type ? 'fulltime' : false
            });
            return jobs;
        } catch (error) {
            console.log(error);
        }
    }

    async function handlePageClick({ selected: selectedPage }) {
        //React Paginate start at page 0
        //API start at page 1
        setIsFetching(true);
        const page = selectedPage + 1;
        const jobs = await getJobs({ page });
        setJobs(jobs);
        setIsFetching(false);
    }

    function handleSearchChange(e) {
        const searchValue = e.target.value;
        setSearchValue(searchValue);
    }

    async function handleSearchClick() {
        if (searchValue) {
            setIsFetching(true);
            const jobs = await getJobs({ search_query: searchValue });
            setJobs(jobs);
            setIsFetching(false);
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
