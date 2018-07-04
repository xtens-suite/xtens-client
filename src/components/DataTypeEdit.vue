<template>
    <div id="main">
        <h1 v-if="isNew">{{ $t('dataTypeEdit.newDataType') }}</h1>
        <h1 v-else>{{ $t('dataTypeEdit.editDataType') }}</h1>
        <div id="content">
            <b-form @submit="onSubmit">
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group horizontal :label-cols="2" :label="$t('general.name')" label-for="name">
                                <b-form-input id="name" :placeholder="$t('dataTypeEdit.dataTypeName')">{{ dataType.name }}</b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-checkbox id="fileUpload" v-model="dataType.superType.schema.header.fileUpload">
                                {{ $t('dataTypeEdit.hasFileUpload') }}
                            </b-form-checkbox>
                        </b-col>
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
        id: String
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
