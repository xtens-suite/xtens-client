import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'vue-test-utils';

import store from '@/store';
import Pagination from '@/components/subcomponents/Pagination';

describe('Pagination.vue', function() {

    describe('onPageChange', function() {

        let stub, wrapper;

        beforeEach(function() {
            stub = sinon.stub(store, 'dispatch');
            wrapper = shallow(Pagination, {
                store,
                propsData: {
                    recordType: 'subject',
                    projects: [],
                    activeProject: undefined,
                    currentPage: 4,
                    totalPages: 20,
                    itemsPerPage: 10,
                    totalItems: 196,
                    links: {
                        first: 'http://localhost:1337/subject?limit=10',
                        previous: 'http://localhost:1337/subject?limit=10&skip=20',
                        next: 'http://localhost:1337/subject?limit=10&skip=40',
                        last: 'http://localhost:1337/subject?limit=10&skip=190'
                    }
                }
            });
        });

        afterEach(function() {
            stub.restore('records/getSubjects');
        });

        it('should trigger the dispatch method with correct action and pagination info as payload', function() {
            wrapper.vm.onPageChange(6);
            expect(stub.calledOnce).to.be.true;
            expect(stub.calledWith()).to.be.true;
        });

        it('should ritorn without triggering dispatch if param is out of page bounds', function() {
            wrapper.vm.onPageChange(-1);
            expect(stub.called).to.be.false;
            wrapper.vm.onPageChange(21);
            expect(stub.called).to.be.false;
        });

    });

});
