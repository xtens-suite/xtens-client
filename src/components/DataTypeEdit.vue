<template>
    <div id="main">
        <h1 v-if="isNew">Create Data Type</h1>
        <h1 v-else>Edit Data Type</h1>
        <div id="content">
            <b-form @submit="onSubmit">
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group horizontal :label-cols="2" label="" label-for="">
                                <b-form-input id="name" palceholder="Data Type Name"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col></b-col>
                        <b-col></b-col>
                        <b-col></b-col>
                    </b-row>
                </b-container>
            </b-form>
        </div>
    </div>
</template>

<script>
// import bForm from 'bootstrap-vue/es/components/form/form';
import { mapGetters } from 'vuex';

export default {

    props: {
        id: Object
    },

    computed: {
        isNew() {
            return Boolean(this.id);
        },
        ...mapGetters({
            dataType: 'records/dataType',
            dataTypes: 'records/dataTypes',
            meta: 'records/meta'
        })
    },

    methods: {
        onSubmit(ev) {
            ev.preventDefault();
        }
    },

    mount() {
        if (!this.id) return;
        this.$store.dispatch('records/getDataTypeForEdit', {
            id: this.id
        });
    }

};
</script>
