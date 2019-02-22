import React from 'react';

import Administration from './Administration';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';

Enzyme.configure({adapter: new Adapter()});

describe( 'Administration component', () => {
    it('renders without crashing', () => {
            const tree = renderer.create(<Administration />).toJSON();
            expect(tree).toMatchSnapshot();
        }
    );

    it('Administration unit test', () => {
        expect(
            Enzyme.shallow(<Administration/>)
                .find('section.Administration')
                .length
        ).toBe(1)
    });

    it('Administration user not connected test', () => {
            Auth.isConnected = jest.fn(() => false);
            const wrapper = Enzyme.shallow(<Administration />);
            expect( wrapper.find('Redirect').length ).toBe(1);
        }
    );

});