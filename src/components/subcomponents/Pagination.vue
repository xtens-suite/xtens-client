<template>
    <ul class="pagination">
        <li class="page-item">
            <a class="page-link" :class="{ disabled: isFirst }" href="#" @click.prevent="onPageChange(0)" aria-label="First">
                <span aria-hidden="true">First</span>
            </a>
        </li>
        <li  class="page-item">
            <a class="page-link" :class="{ disabled: isFirst }" href="#" @click.prevent="onPageChange(currentPage-1)" aria-label="Previous">
                <span aria-hidden="true">Previous</span>
            </a>
        </li>
        <li  class="page-item">
            <a class="page-link disabled" href="#" >
                <span aria-hidden="true">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
            </a>
        </li>
        <li  class="page-item">
            <a class="page-link" :class="{ disabled: isLast }" href="#" @click.prevent="onPageChange(currentPage+1)" aria-label="Next">
                <span aria-hidden="true">Next</span>
            </a>
        </li>
        <li  class="page-item">
            <a class="page-link" :class="{ disabled: isLast }" href="#" @click.prevent="onPageChange(totalPages-1)" aria-label="Last">
                <span aria-hidden="true">Last</span>
            </a>
        </li>
    </ul>
</template>

<script>
import { find } from 'lodash';
import { ALL_PROJECTS } from '@/utils/constants';

const recordType2ActionMap = {
    'subject': 'records/getSubjects'
};

export default {

    props: {
        recordType: String,
        projects: Array,
        activeProject: String,
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: Number,
        itemsPerPage: Number,
        totalItems: Number,
        links: Object
    },

    data() {
        return {};
    },

    computed: {
        isFirst() {
            return this.currentPage <= 0;
        },

        isLast() {
            return this.currentPage >= this.totalPages - 1;
        }
    },

    methods: {
        onPageChange(pageIndex) {
            if (pageIndex < 0 || pageIndex >= this.totalPages) return;
            const { projects, itemsPerPage } = this;
            // const actProj = find(projects, proj => proj.name === this.activeProject);
            // const allProj = ALL_PROJECTS;
            const activeProject = this.activeProject !== ALL_PROJECTS ? find(projects, { name: this.activeProject }) : undefined;
            this.$store.dispatch(recordType2ActionMap[this.recordType], {
                activeProject,
                limit: itemsPerPage,
                skip: itemsPerPage * pageIndex
            });
            return false;
        }
    }

};
</script>

<style scoped lang="scss">
$disabled-opacity: 0.65;
a.disabled {
    pointer-events: none;
    opacity: $disabled-opacity;
    box-shadow: none;
    cursor: not-allowed;
}
</style>
