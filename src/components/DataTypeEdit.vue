<template>
    <div id="main">
        <h1 v-if="isNew">{{ $t('dataType.newDataType') }}</h1>
        <h1 v-else>{{ $t('dataType.editDataType') }}</h1>
        <div id="content">
            <b-form @submit="onSubmit">
                <b-container>
                    <b-row>
                        <b-col md="6" sm="9">
                            <b-form-group horizontal :label-cols="2" :label="$t('general.name')" label-for="name">
                                <b-form-input id="name" :placeholder="$t('dataType.dataTypeName')">{{ dataType.name }}</b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="auto">
                            <b-form-checkbox id="fileUpload" v-model="dataType.superType.schema.header.fileUpload">
                                {{ $t('dataType.hasFileUpload') }}
                            </b-form-checkbox>
                        </b-col>
                        <b-col></b-col>
                        <b-col></b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6" sm="12">
                            <b-form-select :label-cols="2" :label="$t('dataType.model')" v-model="dataType.model" :options="dataTypeModelOptions" ></b-form-select>
                        </b-col>
                        <b-col md="6" sm="12">
                            <b-form-group horizontal :label-cols="2" :label="$t('dataType.parent')" label-for="parents">
                                <v-select id="parents" :v-model="dataType.parents" :options="dataTypes" label="name"></v-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>
            </b-form>
        </div>
    </div>
</template>

<script>
// import bForm from 'bootstrap-vue/es/components/form/form';
import Vue from 'vue';
import vSelect from 'vue-select';
import { mapGetters } from 'vuex';

import { DATA_TYPE_MODELS } from '@/utils/constants';

Vue.component('v-select', vSelect);

export default {

    props: {
        id: Number
    },

    data() {
        return {
            dataTypeModelOptions: DATA_TYPE_MODELS.map(elem => {
                return { value: elem, text: elem.toUpperCase() };
            })
        };
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

    mounted() {
        if (!this.id) return;
        this.$store.dispatch('records/getDataTypeForEdit', {
            id: this.id
        });
    }

};
</script>
