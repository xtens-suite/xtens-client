import { expect } from 'chai';

import { omit, cloneDeep } from 'lodash';

import {
    REMOTE_REQUEST, SUBJECTS_SUCCESS, DATA_TYPES_SUCCESS,
    DATA_TYPE_SUCCESS, REMOTE_ERROR
} from '@/store/mutation-types';

import records from '@/store/records';
import dataTypes from '../fixtures/dataTypes/dataTypeList';
import subjects from '../fixtures/subjects/subjectList';

import dataType from '../fixtures/dataTypes/dataType';

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

const dtHeaders = {
    'x-current-page': '0',
    'x-page-size': '30',
    'x-total-count': '45',
    'x-total-pages': '2',
    link: '<http://localhost:1337/dataType?limit=30&skip=30>; rel=next, <http://localhost:1337/dataType?limit=30&skip=30>; rel=last'
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

        let commit, getRecordStub, correctPayload, malformedPayload, state;

        describe('getDataTypes', function() {

            beforeEach(function() {
                commit = sinon.stub();
                getRecordStub = sinon.stub(recordsApi, 'getDataTypes');
                malformedPayload = { '': 'this is malformed' };
                getRecordStub.withArgs(correctPayload).returns({
                    data: dataTypes,
                    headers: dtHeaders
                });
                getRecordStub.withArgs(malformedPayload).throws();
                state = cloneDeep(testState);
            });

            afterEach(function() {
                getRecordStub.restore();
            });

            it('commits a REMOTE_REQUEST event', function(done) {
                records.actions.getDataTypes({commit, state}, correctPayload)
                .then(() => {
                    expect(commit.calledWithExactly(REMOTE_REQUEST)).to.be.true;
                    done();
                }).catch(err => {
                    done(err);
                });
            });

            it('commits a DATA_TYPE_SUCCESS event with headers and dataTypes as properties of the second argument', function(done) {
                records.actions.getDataTypes({commit, state}, correctPayload)
                .then(() => {
                    const secondArg = {
                        dataTypes,
                        headers: dtHeaders
                    };
                    expect(commit.calledWithExactly(DATA_TYPES_SUCCESS, secondArg)).to.be.true;
                    done();
                }).catch(done);
            });

            it('commits a REMOTE_ERROR event if an error is throw by recordsApi.getDataTypes()', function(done) {
                records.actions.getDataTypes({commit, state}, malformedPayload)
                .then(() => {
                    expect(commit.calledWith(REMOTE_ERROR)).to.be.true;
                    done();
                }).catch(err => {
                    done(err);
                });
            });

        });

        describe('getDataTypeForEdit', function() {

            let getDataTypesStub, getSuperTypeMetaStub;

            beforeEach(function() {
                commit = sinon.stub();
                correctPayload = { id: 7 };
                malformedPayload = { id: 'this is malformed' };
                getRecordStub = sinon.stub(recordsApi, 'getDataType');
                getRecordStub.throws();
                getRecordStub.withArgs(correctPayload).returns({
                    data: dataType
                });
                getRecordStub.withArgs(malformedPayload).throws();
                getDataTypesStub = sinon.stub(recordsApi, 'getDataTypes').returns({
                    data: dataTypes
                });
                console.log(`SuperType ID is: ${JSON.stringify(dataType.superType.id)}`);
                getSuperTypeMetaStub = sinon.stub(recordsApi, 'getSuperTypeMeta').returns({
                    data: {
                        isMultiProject: false
                    }
                });
                getSuperTypeMetaStub.withArgs(dataType.superType.id).returns({
                    data: {
                        isMultiProject: true
                    }
                });
                state = cloneDeep(testState);
            });

            afterEach(function() {
                getRecordStub.restore();
                getDataTypesStub.restore();
                getSuperTypeMetaStub.restore();
            });

            it('correctly commits a DATA_TYPE_SUCCESS event with the expected payload', function(done) {
                records.actions.getDataTypeForEdit({commit, state}, { id: 7 })
                .then(res => {
                    console.log(`records.spec.js - getDataTypeForEdit: response = ${res}`);
                    const meta = { isMultiProject: true };
                    console.log(JSON.stringify(commit.lastCall.args));
                    console.log(JSON.stringify(getSuperTypeMetaStub.lastCall));
                    const args = [DATA_TYPES_SUCCESS, {
                        dataType,
                        dataTypes,
                        meta
                    }];
                    expect(commit.calledWithExactly(...args)).to.be.true;
                    done();
                }).catch(err => {
                    done(err);
                });
            });

        });

        describe('getSubjects', function() {

            beforeEach(function() {
                commit = sinon.stub();

                getRecordStub = sinon.stub(recordsApi, 'getSubjects');
                correctPayload = {};
                malformedPayload = { '': 'this is malformed' };
                getRecordStub.withArgs(correctPayload).returns({
                    data: subjects,
                    headers: resHeaders
                });
                getRecordStub.withArgs(malformedPayload).throws();
                state = cloneDeep(testState);
            });

            afterEach(function() {
                getRecordStub.restore();
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
                    expect(getRecordStub.calledWithExactly(correctPayload)).to.be.true;
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

        describe('DATA_TYPE_SUCCESS', function() {

            beforeEach(function() {
                const meta = { isMultiProject: true };
                records.mutations[DATA_TYPE_SUCCESS](testState, {
                    dataType,
                    dataTypes,
                    meta
                });
            });

            it('sets isPending to false', function() {

                expect(testState.isPending).to.be.false;
            });

            it('sets isMultiProject to false within dataType.superType', function() {
                expect(testState).to.have.nested.property('dataType.superType.isMultiProject', true);
            });

            it('sets dataType and dataTypes correctly', function() {
                expect(testState).to.have.property('dataTypes', dataTypes);
                expect(omit(testState.dataType, 'superType')).to.eql(omit(dataType, 'superType'));
                expect(omit(testState.dataType.superType, 'isMultiProject')).to.eql(dataType.superType);
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
