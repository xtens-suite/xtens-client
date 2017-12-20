import axios from 'axios';
import { DEFAULT_LIMIT, DEFAULT_SORTING_CRITERION } from '@/utils/constants';

export async function getSubjects(activeProject) {
    const response = await axios.get('/api/subject', {
        params: {
            project: activeProject,
            populate: 'type',
            limit: DEFAULT_LIMIT,
            sort: DEFAULT_SORTING_CRITERION
        }
    });
    return response;
}
