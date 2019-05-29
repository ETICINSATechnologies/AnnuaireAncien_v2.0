import React from 'react';

import Recovery from './Recovery';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';
import {BrowserRouter} from 'react-router-dom'

Enzyme.configure({adapter: new Adapter()});

describe( 'Recovery component', () => {
    it('renders without crashing', () => {
            const tree = renderer.create(<BrowserRouter><Recovery /></BrowserRouter>).toJSON();
            expect(tree).toMatchSnapshot();
        }
    );

    it('Recovery unit test', () => {
        expect(
            Enzyme.shallow(<Recovery/>)
                .find('div.Recovery')
                .length
        ).toBe(1)
    });

    it('Recovery user connected button test', () => {
            Auth.isConnected = jest.fn(() => true);
            const expected = ["home","disconnection"];
            expect( Auth.addCorrectButton(["home"]) ).toEqual(expected);
        }
    );

    it('Recovery user not connected button test', () => {
            Auth.isConnected = jest.fn(() => false);
            const expected = ["home","connection"];
            expect( Auth.addCorrectButton(["home"]) ).toEqual(expected);
        }
    );

});