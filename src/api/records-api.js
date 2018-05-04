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
            project: activeProject ? activeProject.id : undefined,
            populate: 'type',
            limit,
            skip,
            sort
        }
    });
    return response;
}

export async function getDataTypes({
    activeProject,
    limit = undefined,
    skip = 0,
    sort = DEFAULT_SORTING_CRITERION
} = {}) {
    const response = await axios.get('api/dataType', {
        params: {
            project: activeProject ? activeProject.id : undefined,
            populate: ['parents', 'project'],
            limit,
            skip,
            sort
        }
    });
    return response;
}
