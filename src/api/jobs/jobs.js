const API_URL = `https://awesome-indeed.p.rapidapi.com/indeed_jobs_detailed?`;

/*
    Parameters:
        search_query: required
        page: required
        location: required
*/
export function fetchJobs(search_query, page, location) {
    console.log('by loc');
    return fetch(
        `${API_URL}search_query=${search_query}&location=${location}&page=${page}`,
        {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'awesome-indeed.p.rapidapi.com',
                'x-rapidapi-key':
                    'fe17eb0229msh0b2bee6b34d5ba3p1c2c71jsn3870141fdf7f'
            }
        }
    )
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => Promise.reject(error));
}

export function fetchJobsByJobType(search_query, page, location, job_type) {
    console.log('By type');
    return fetch(
        `${API_URL}search_query=${search_query}&location=${location}&job_type=${job_type}&page=${page}`,
        {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'awesome-indeed.p.rapidapi.com',
                'x-rapidapi-key':
                    'fe17eb0229msh0b2bee6b34d5ba3p1c2c71jsn3870141fdf7f'
            }
        }
    )
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => Promise.reject(error));
}
