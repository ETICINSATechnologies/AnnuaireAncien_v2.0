import React from 'react';

import Recuperation from './Recuperation';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';

Enzyme.configure({adapter: new Adapter()});

describe( 'Recuperation component', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(<Recuperation />).toJSON();
        expect(tree).toMatchSnapshot();
        }
    );

    it('Recuperation unit test', () => {
        expect(
            Enzyme.shallow(<Recuperation/>)
                .find('div.Recuperation')
                .length
        ).toBe(1)
    });

    it('Recuperation user connected button test', () => {
        Auth.isConnected = jest.fn(() => true);
        const expected = ["home","disconnection"];
        expect( Auth.addCorrectButton(["home"]) ).toEqual(expected);
        }
    );

    it('Recuperation user not connected button test', () => {
            Auth.isConnected = jest.fn(() => false);
            const expected = ["home","connection"];
            expect( Auth.addCorrectButton(["home"]) ).toEqual(expected);
        }
    );

});