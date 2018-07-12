import axios from 'axios';
import { DEFAULT_SORTING_CRITERION } from '@/utils/constants';

export async function getProjects() {
    const response = await axios.get('/api/project', {
        params: {
            // sort: 'id ASC',
            sort: DEFAULT_SORTING_CRITERION,
            populate: 'groups'
        }
    });
    return response;
}
