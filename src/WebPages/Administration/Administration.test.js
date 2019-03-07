import React from 'react';

import Administration from './Administration';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

Enzyme.configure({adapter: new Adapter()});

describe( 'Administration component', () => {
    it('renders without crashing', () => {
        const componentDiv = document.createElement('div');
        ReactDOM.render(shallow(
            <Router>
                <Administration/>
            </Router>
            )
            , componentDiv);
        ReactDOM.unmountComponentAtNode(componentDiv);
        }
    );

    it('Administration unit test', () => {
        Auth.isConnected = jest.fn(() => true);
        expect(
            shallow(<Administration/>)
                .find('section.Administration')
                .length
        ).toBe(1)
    });

    it('Administration user not connected snapshot test', () => {
            Auth.isConnected = jest.fn(() => false);
            const component = renderer.create(
                <Router>
                    <Administration/>
                </Router>
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        }
    );

    it('Administration user connected snapshot test', () => {
            Auth.isConnected = jest.fn(() => false);
            const component = renderer.create(
                <Router>
                    <Administration/>
                </Router>
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        }
    );
});