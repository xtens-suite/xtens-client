import axios from 'axios';
import { DEFAULT_LIMIT, DEFAULT_SORTING_CRITERION } from '@/utils/constants';

/**
 * @method
 * @name getSubjects
 * @param{Object/Integer} payload.activeProject - the id of the current active project or the project object
 * @param{Integer} payload.limit - integer
 * @param{Integer} payload.skip - integer
 * @param{String} payload.sort - must be a meaningful sorting criterion for the underlying database
 */
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

/**
 * @method
 * @name getDataTypes
 * @param{Object/Integer} payload.activeProject
 * @param{Integer} payload.limit - integer
 * @param{Integer} payload.skip - integer
 * @param{String} payload.sort - must be a meaningful sorting criterion for the underlying database
 */
export async function getDataTypes({
    activeProject,
    limit = undefined,
    skip = 0,
    sort = DEFAULT_SORTING_CRITERION
} = {}) {
    const response = await axios.get('/api/dataType', {
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

/**
 * @method
 * @name getDataType
 * @param{Integer} id - the id/primary key of the dataType
 */
export async function getDataType({
    id,
    populate = ['parents', 'project', 'superType']
}) {
    const response = await axios.get(`/api/dataType/${id}`, {
        params: {
            populate
        }
    });
    return response;
}

/**
 * @method
 * @name getSuperTypeMeta
 * @param{Integer} id - the id/primary key of the superType
 */
export async function getSuperTypeMeta(id) {
    const response = await axios.get(`/api/superType/meta/${id}`);
    return response;
}
