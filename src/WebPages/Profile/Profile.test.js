import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from "react-router-dom";

import Profile from './Profile';
import Auth from '../../Components/Auth/Auth';

Enzyme.configure({adapter: new Adapter()});

describe( 'Profile component', () => {
    it('renders without crashing', () => {
            const componentDiv = document.createElement('div');
            ReactDOM.render(shallow(
                <Router>
                    <Profile/>
                </Router>
            )
            , componentDiv);
            ReactDOM.unmountComponentAtNode(componentDiv);
        }
    );

    it('Profile unit test', () => {
        Auth.isConnected = jest.fn(() => true);
        expect(
            shallow(<Profile/>)
            .find('section.Profile')
            .length
        ).toBe(1)

    });

    it('Profile not connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => false);
        const component = renderer.create(
            <Router>
                <Profile/>
            </Router>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Profile connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => true);
        const component = renderer.create(
            <Router>
                <Profile/>
            </Router>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

});