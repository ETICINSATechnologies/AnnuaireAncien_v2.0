import React from 'react';
import Profile from './Profile';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';

Enzyme.configure({adapter: new Adapter()});

describe( 'Profile component', () => {
    it('renders without crashing', () => {
            const tree = renderer.create(<Profile />).toJSON();
            expect(tree).toMatchSnapshot();
        }
    );

    it('Profile unit test', () => {
        expect(Enzyme.shallow(<Profile/>)
            .find('div.Profile')
            .length
        ).toBe(1)
    });

    it('Profile not connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => false);
        const wrapper = Enzyme.shallow(<Profile/>);
        expect(wrapper.find('status')).toEqual('not_authenticate');
    });

    it('Profile connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => true);
        const component = renderer.create(<Profile/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

});