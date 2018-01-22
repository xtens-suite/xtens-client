import { expect } from 'chai';

import { REMOTE_REQUEST, SUBJECTS_SUCCESS, REMOTE_ERROR } from '@/store/mutation-types';

import records from '@/store/records';
import subjects from '../fixtures/subjects/subjectList';

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
