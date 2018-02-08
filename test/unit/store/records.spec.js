import { expect } from 'chai';

import { cloneDeep } from 'lodash';

import { REMOTE_REQUEST, SUBJECTS_SUCCESS, REMOTE_ERROR } from '@/store/mutation-types';

import records from '@/store/records';
import subjects from '../fixtures/subjects/subjectList';

import * as recordsApi from '@/api/records-api';

const testState = {
    isPending: false,

    subjects: subjects,
    samples: [],
    data: [],

    paginationInfo: {
        currentPage: 0
    },

    error: null
};

const resHeaders = {
    'x-current-page': '0',
    'x-page-size': '30',
    'x-total-count': '1604',
    'x-total-pages': '54',
    link: '<http://localhost:1337/subject?limit=30&skip=30>; rel=next, <http://localhost:1337/subject?limit=30&skip=1590>; rel=last'
};

describe('records', function() {

    describe('getters', function() {

        describe('subjects', function() {
            it('gets the \'subjects\' property of the state', function() {
                expect(records.getters.subjects(testState)).to.eql(subjects);
            });
        });

        describe('paginationInfo', function() {
            it('gets the \'paginationInfo\' property of the state', function() {
                expect(records.getters.paginationInfo(testState)).to.eql(testState.paginationInfo);
            });
        });

    });

    describe('actions', function() {

        let commit, getSubjStub, correctPayload, malformedPayload, state;

        describe('getSubject', function() {

            beforeEach(function() {
                commit = sinon.stub();

                getSubjStub = sinon.stub(recordsApi, 'getSubjects');
                correctPayload = {};
                malformedPayload = { '': 'this is malformed' };
                getSubjStub.withArgs(correctPayload).returns({
                    data: subjects,
                    headers: resHeaders
                });
                getSubjStub.withArgs(malformedPayload).throws();
                state = cloneDeep(testState);
            });

            afterEach(function() {
                getSubjStub.restore();
            });

            it('commits a REMOTE_REQUEST event', function(done) {
                records.actions.getSubjects({commit, state}, correctPayload)
                .then(() => {
                    expect(commit.calledWithExactly(REMOTE_REQUEST)).to.be.true;
                    done();
                }).catch(err => {
                    done(err);
                });
            });

            it('commits a SUBJECTS_SUCCESS event with headers and subjects as properties of the second argument', function(done) {
                records.actions.getSubjects({commit, state}, correctPayload)
                .then(() => {
                    const arg1 = {
                        subjects,
                        headers: resHeaders
                    };
                    expect(commit.calledWithExactly(SUBJECTS_SUCCESS, arg1)).to.be.true;
                    done();
                }).catch(err => {
                    done(err);
                });
            });

            it('triggers a call of the api.getSubjects() method with correct \'payload\' argument', function(done) {
                records.actions.getSubjects({commit, state}, correctPayload)
                .then(() => {
                    expect(getSubjStub.calledWithExactly(correctPayload)).to.be.true;
                    done();
                }).catch(err => {
                    done(err);
                });
            });

            it('commits a REMOTE_ERROR event if an error is throw by recordsApi.getSubjects()', function(done) {
                records.actions.getSubjects({commit, state}, malformedPayload)
                .then(() => {
                    expect(commit.calledWith(REMOTE_ERROR)).to.be.true;
                    done();
                }).catch(err => {
                    done(err);
                });
            });

        });

    });

    describe('mutations', function() {

        describe('REMOTE_REQUEST', function() {
            it('sets the isPending property of the state to true', function() {
                records.mutations[REMOTE_REQUEST](testState);
                expect(testState.isPending).to.be.true;
            });
        });

        describe('SUBJECTS_SUCCESS', function() {
            it('sets isPending to false', function() {
                records.mutations[SUBJECTS_SUCCESS](testState, {
                    subjects,
                    headers: resHeaders
                });
                expect(testState.isPending).to.be.false;
            });

            it('sets subjects to the value provided in the corrispondent payload property', function() {
                records.mutations[SUBJECTS_SUCCESS](testState, {
                    subjects,
                    headers: resHeaders
                });
                expect(testState.subjects).to.eql(subjects);
            });

            it('sets the Pagination Info as read from the header', function() {
                records.mutations[SUBJECTS_SUCCESS](testState, {
                    subjects,
                    headers: resHeaders
                });
                expect(testState.paginationInfo).to.have.property('currentPage', Number.parseInt(resHeaders['x-current-page']));
                expect(testState.paginationInfo).to.have.property('pageSize', Number.parseInt(resHeaders['x-page-size']));
                expect(testState.paginationInfo).to.have.property('totalItems', Number.parseInt(resHeaders['x-total-count']));
                expect(testState.paginationInfo).to.have.property('totalPages', Number.parseInt(resHeaders['x-total-pages']));
                console.log(testState.paginationInfo);
                expect(testState.paginationInfo).to.have.nested.property('links.next', 'http://localhost:1337/subject?limit=30&skip=30');
                expect(testState.paginationInfo).to.have.nested.property('links.last', 'http://localhost:1337/subject?limit=30&skip=1590');

            });

        });

        describe('REMOTE_ERROR', function() {

            it('sets the isPending property of the state to false and sets the errorResponse', function() {
                const errorResponse = {
                    message: 'This is a bl00dy error'
                };
                records.mutations[REMOTE_ERROR](testState, errorResponse);
                expect(testState.error).to.eql(errorResponse);
            }); 

        });

    });

});
