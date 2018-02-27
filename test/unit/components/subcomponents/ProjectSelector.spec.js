import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'vue-test-utils';

import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox';

import store from '@/store';
import router from '@/router';
import ProjectSelector from '@/components/subcomponents/ProjectSelector';

import projects from '../../fixtures/projects/projectList';

describe('ProjectSelector.vue', function() {

    describe('overall behaviour', function() {

        let wrapper;

        beforeEach(function() {
            wrapper = shallow(ProjectSelector, {
                propsData: {
                    projects
                }
            });
        });

        it('does not contain the project selector if the checkbox is not ticked', function() {
            expect(wrapper.contains('#activeProjectSelect')).to.be.false;
        });

        it('contains the project selector if the checkbox is ticked', function() {
            wrapper.setData({ changeEnabled: true });
            expect(wrapper.contains('#activeProjectSelect')).to.be.true;
        });
    });

    describe('methods', function() {

        describe('activeProjectOnChange()', function() {

            let wrapper, dstub;

            beforeEach(function() {
                dstub = sinon.stub(store, 'dispatch');

                wrapper = mount(ProjectSelector, {
                    propsData: {
                        projects
                    },
                    store
                });
            });

            it('dispatches the changeActiveProject action', function() {
                // TODO
                wrapper.find();
            });

        });

    });

});
