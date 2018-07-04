import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from '@vue/test-utils';

import store from '@/store';
import i18n from '@/i18n';
import DataTypeEdit from '@/components/DataTypeEdit.vue';

describe('DataTypeEdit.vue', function() {

    describe('mounted()', function() {
        let stub;

        beforeEach(function() {
            stub = sinon.stub(store, 'dispatch');
        });

        afterEach(function() {
            stub.restore();
        });

        it('does not trigger the records/getDataTypeForEdit action when the component is mounted and no \'id\' prop is passed', function() {
            mount(DataTypeEdit, { store, i18n });
            expect(stub.called).to.be.false;
        });

        it('triggers the records/getDataTypeForEdit action when the component is mounted and the \'id\' prop is passed', function() {
            mount(DataTypeEdit, {
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
            const wrapper = mount(DataTypeEdit, { store, i18n });
            const div = wrapper.find('#content');
            expect(div.is('div')).to.be.true;
            const input = wrapper.find('#name');
            expect(input.vm.$props.placeholder).to.equal(i18n.messages.en.general.name);
        });

    });

});
