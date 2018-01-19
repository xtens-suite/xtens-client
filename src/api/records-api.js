import axios from 'axios';
import { DEFAULT_LIMIT, DEFAULT_SORTING_CRITERION } from '@/utils/constants';

export async function getSubjects({
    activeProject,
    limit = DEFAULT_LIMIT,
    skip = 0,
    sort = DEFAULT_SORTING_CRITERION
} = {}) {
    const response = await axios.get('/api/subject', {
        params: {
            project: activeProject,
            populate: 'type',
            limit,
            skip,
            sort
        }
    });
    return response;
}
