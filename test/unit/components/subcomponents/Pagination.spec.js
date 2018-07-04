import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from '@vue/test-utils';

import store from '@/store';
import Pagination from '@/components/subcomponents/Pagination';

describe('Pagination.vue', function() {

    const paginationProps = {
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
    };

    describe('methods', function() {

        describe('onPageChange', function() {

            let stub, wrapper;

            beforeEach(function() {
                stub = sinon.stub(store, 'dispatch');
                wrapper = shallow(Pagination, {
                    store,
                    propsData: paginationProps
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

    describe('computed', function() {

        describe('isFirst', function() {

            let wrapper;

            it('should return true if it\'s set on the first page', function() {
                wrapper = shallow(Pagination, {
                    store,
                    propsData: {
                        ...paginationProps,
                        currentPage: 0,
                        links: {} // let's omit the links here
                    }
                });
                expect(wrapper.vm.isFirst).to.be.true;
            });

            it('should return false if it\'s not set on the first page', function() {
                wrapper = shallow(Pagination, {
                    store,
                    propsData: paginationProps
                });
                expect(wrapper.vm.isFirst).to.be.false;
            });

        });

        describe('isLast', function() {

            let wrapper;

            it('should return true if it\'s set on the last page', function() {
                wrapper = shallow(Pagination, {
                    store,
                    propsData: {
                        ...paginationProps,
                        currentPage: paginationProps.totalPages - 1,
                        links: {} // let's omit the links here
                    }
                });
                expect(wrapper.vm.isLast).to.be.true;
            });

            it('should return false if it\'s not set on the last page', function() {
                wrapper = shallow(Pagination, {
                    store,
                    propsData: paginationProps
                });
                expect(wrapper.vm.isLast).to.be.false;
            });

        });

    });

});
