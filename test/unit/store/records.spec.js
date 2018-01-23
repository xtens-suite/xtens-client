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

        let commit, getSubjStub, resHeaders, payload, state;

        describe('getSubject', function() {

            beforeEach(function() {
                commit = sinon.stub();
                resHeaders = 'whatever';
                getSubjStub = sinon.stub(recordsApi, 'getSubjects').returns({
                    data: subjects,
                    headers: resHeaders
                });
                payload = {};
                state = cloneDeep(testState);
            });

            afterEach(function() {
                getSubjStub.restore();
            });

            it('commits a REMOTE_REQUEST event', function(done) {
                records.actions.getSubjects({commit, state}, payload)
                .then(() => {
                    expect(commit.calledWithExactly(REMOTE_REQUEST)).to.be.true;
                    done();
                }).catch(err => {
                    done(err);
                });
            });

            it('commits a SUBJECTS_SUCCESS event with headers and subjects as properties of the second argument', function(done) {
                records.actions.getSubjects({commit, state}, payload)
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
                records.actions.getSubjects({commit, state}, payload)
                .then(() => {
                    expect(getSubjStub.calledWithExactly(payload)).to.be.true;
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
