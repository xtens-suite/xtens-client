import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'vue-test-utils';

import store from '@/store';
import DataTypeList from '@/components/DataTypeList.vue';

describe('DataTypeList.vue', function() {

    describe('mounted()', function() {

        let stub;

        beforeEach(function() {
            stub = sinon.stub(store, 'dispatch');
        });

        afterEach(function() {
            stub.restore();
        });

        it('triggers the records/getDataTypes() action when the component is mounted', function() {
            mount(DataTypeList, { store });
            expect(stub.calledOnce).to.be.true;
            expect(stub.calledWith('records/getDataTypes')).to.equal(true);
        });

    });

});
