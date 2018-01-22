<template>
    <ul class="pagination">
        <li class="page-item">
            <a class="page-link" href="#" @click.prevent="onPageChange(0)" aria-label="First">
                <span aria-hidden="true">First</span>
            </a>
        </li>
        <li  class="page-item">
            <a class="page-link" href="#" @click.prevent="onPageChange(currentPage-1)" aria-label="Previous">
                <span aria-hidden="true">Previous</span>
            </a>
        </li>
        <li  class="page-item">
            <a class="page-link" href="#" >
                <span aria-hidden="true">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
            </a>
        </li>
        <li  class="page-item">
            <a class="page-link" href="#" @click.prevent="onPageChange(currentPage+1)" aria-label="Next">
                <span aria-hidden="true">Next</span>
            </a>
        </li  class="page-item">
            <a class="page-link" href="#" @click.prevent="onPageChange(totalPages-1)" aria-label="Last">
                <span aria-hidden="true">Last</span>
            </a>
    </li>
</ul>
</template>

<script>
import { ALL_PROJETCS } from '@/utils/constants';

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

    methods: {
        onPageChange(pageIndex) {
            if (pageIndex < 0 || pageIndex >= this.totalPages) return;
            const { projects, itemsPerPage } = this;
            const activeProject = this.activeProject !== ALL_PROJETCS ? find(projects, { name: this.activeProject }) : undefined;
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
