import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from '@vue/test-utils';

import store from '@/store';
import SubjectList from '@/components/SubjectList.vue';

describe('SubjectList.vue', function() {

    describe('mounted()', function() {

        let stub;

        beforeEach(function() {
            stub = sinon.stub(store, 'dispatch');
        });

        afterEach(function() {
            stub.restore();
        });

        it('triggers the records/getSubjects() action when the component is mounted', function() {
            mount(SubjectList, { store });
            expect(stub.calledOnce).to.be.true;
            expect(stub.calledWith('records/getSubjects')).to.equal(true);
        });

    });

});
