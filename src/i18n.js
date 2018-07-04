import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {

    en: {
        general: {
            name: 'Name'
        },
        dataTypeEdit: {
            newDataType: 'New Data Type',
            editDataType: 'Edit Data Type',
            dataTypeName: 'Data Type Name',
            hasFileUpload: 'Has File Upload?'
        }
    },

    it: {
        general: {
            name: 'Name'
        },
        dataTypeEdit: {
            newDataType: 'Nuovo Tipo di Dato',
            editDataType: 'Modifica Tipo di Dato',
            dataTypeName: 'Nome del Tipo di Dato'
        }
    }

};

export default new VueI18n({
    locale: 'en',
    messages
});
