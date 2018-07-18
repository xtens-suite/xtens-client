import { expect } from 'chai';
import sinon from 'sinon';
import { shallowMount, mount } from '@vue/test-utils';

import store from '@/store';
import ProjectSelector from '@/components/subcomponents/ProjectSelector';

import projects from '../../fixtures/projects/projectList';

describe('ProjectSelector.vue', function() {

    describe('overall behaviour', function() {

        let wrapper;

        beforeEach(function() {
            // dstub = sinon.stub(store, 'dispatch');
            wrapper = mount(ProjectSelector, {
                propsData: {
                    projects
                }// ,
                // store
            });
        });

        // afterEach(function() {
        //     dstub.restore();
        // });

        it('does not contain the project selector if the checkbox is not ticked', function() {
            expect(wrapper.contains('#activeProjectSelect')).to.be.false;
        });

        it.only('contains the project selector if the checkbox is ticked', function() {
            console.log(wrapper.html());
            wrapper.setData({ changeEnabled: true });
            wrapper.vm.$forceUpdate(); // it does not seem to update automatically
            // const checkboxRef = wrapper.find({ ref: 'changeEnabledCheckbox' });
            // checkboxRef.trigger('click');
            console.log(wrapper.html());
            expect(wrapper.contains('#activeProjectSelect')).to.be.true;
        });
    });

    describe('methods', function() {

        describe('activeProjectOnChange()', function() {

            let wrapper, dstub;

            beforeEach(function() {
                dstub = sinon.stub(store, 'dispatch');

                wrapper = shallowMount(ProjectSelector, {
                    propsData: {
                        projects
                    },
                    store
                });
            });

            afterEach(function() {
                dstub.restore();
            });

            it('dispatches the changeActiveProject action', function() {
                const nextProject = wrapper.vm.$props.projects[0].name;
                wrapper.setData({
                    selectedProject: nextProject
                });
                wrapper.vm.changeActiveProject();
                expect(dstub.calledWithExactly('account/changeActiveProject', nextProject)).to.be.true;
            });

            it('closes the modal', function() {
                const spy = sinon.spy(wrapper.vm.$root, '$emit');
                wrapper.vm.changeActiveProject();
                expect(spy.calledWithExactly('bv::hide::modal', 'activeProjectSelectorModal'));
            });

            /*
            it('dispatches the changeActiveProject action', function() {
                // TODO
                wrapper.find({ref: 'changeEnabledCheckbox'}).trigger('click');
                expect(wrapper.contains('#activeProjectSelect')).to.be.true;
                const selectWrapper = wrapper.find('#activeProjectSelect');
                selectWrapper.vm.value = selectWrapper.vm.options[0].value;
                selectWrapper.trigger('change');
                expect(dstub.calledOnce).to.be.true;
                expect(dstub.calledWith('account/changeActiveProject'));
            }); */

        });

        describe('openModal()', function() {

            it('opens the modal', function() {
                const wrapper = shallowMount(ProjectSelector, {
                    propsData: {
                        projects
                    }
                });
                const spy = sinon.spy(wrapper.vm.$root, '$emit');
                wrapper.vm.openModal();
                expect(spy.calledWithExactly('bv::show::modal', 'activeProjectSelectorModal'));
            });

        });

    });
});
