import React from 'react';

import Connection from './Connection';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';
import fetch from '../../__mocks__/fetch'
Enzyme.configure({adapter: new Adapter()});

describe( 'Connection component' , () => {

    it('renders without crashing', () => {
        const tree = renderer.create(<Connection />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Connection unit test', () => {
        expect(
            Enzyme.shallow(<Connection/>)
                .find('div.Connection')
                .length
        ).toBe(1)
    });

    it('Connection button clicked', () => {
        // fetch.url = jest.fn( () => 'api/v1/auth/login' );
        const wrapper = Enzyme.shallow(<Connection/>);
        wrapper.find(".connect_input").simulate('click', { preventDefault() {} });
        expect(wrapper.state("status")).toBeTruthy();
        // expect(wrapper.state("status")).equals("connect");
    });



});