import { expect } from 'chai';
import sinon from 'sinon';
import { mount, createLocalVue } from '@vue/test-utils';

import vSelect from 'vue-select';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';

import store from '@/store';
import i18n from '@/i18n';

import DataTypeEdit from '@/components/DataTypeEdit.vue';
import { DATA_TYPE_MODELS } from '@/utils/constants';

describe('DataTypeEdit.vue', function() {

    let localVue;

    beforeEach(function() {
        localVue = createLocalVue();
        localVue.use(Vuex);
        localVue.use(BootstrapVue);
    });

    describe('data()', function() {
        it('sets the correct default data', function() {
            expect(typeof DataTypeEdit.data).to.equal('function');
            const defaultData = DataTypeEdit.data();
            expect(defaultData.dataTypeModelOptions).to.be.an('array').of.length(DATA_TYPE_MODELS.length);
            let index = 0;
            for (const el of defaultData.dataTypeModelOptions) {
                expect(el.value).to.equal(DATA_TYPE_MODELS[index]);
                expect(el.text).to.equal(DATA_TYPE_MODELS[index++].toUpperCase());
            }
        });
    });

    describe('mounted()', function() {
        let stub;

        beforeEach(function() {
            stub = sinon.stub(store, 'dispatch');
        });

        afterEach(function() {
            stub.restore();
        });

        it('does not trigger the records/getDataTypeForEdit action when the component is mounted and no \'id\' prop is passed', function() {
            mount(DataTypeEdit, { localVue, store, i18n });
            expect(stub.called).to.be.false;
        });

        it('triggers the records/getDataTypeForEdit action when the component is mounted and the \'id\' prop is passed', function() {
            mount(DataTypeEdit, {
                // localVue,
                store,
                i18n,
                propsData: {
                    id: 1
                }
            });
            expect(stub.calledOnce).to.be.true;
            expect(stub.calledWith('records/getDataTypeForEdit')).to.equal(true);
        });

        it('does show the data type name input tag', function() {
            const wrapper = mount(DataTypeEdit, { localVue, store, i18n });
            const div = wrapper.find('#content');
            expect(div.is('div')).to.be.true;
            const input = wrapper.find('#name');
            console.log(input.html());
            expect(input.vm.$props.placeholder).to.equal(i18n.messages.en.dataType.dataTypeName);
        });

        it('does show the multiple selector for the parent dataTypes', function() {
            const wrapper = mount(DataTypeEdit, { localVue, store, i18n });
            console.log(wrapper.html());
            const select = wrapper.find('#parents');
            expect(select.is(vSelect)).to.be.true;
            expect(select.props().options).to.eql([]);
        });

    });

});
