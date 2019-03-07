import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from "react-router-dom";

import Search from './Search';
import Auth from '../../Components/Auth/Auth';

Enzyme.configure({adapter: new Adapter()});

describe('Search component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(shallow(
            <Router>
                <Search/>
            </Router>), div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Search connected unit test', () => {
        Auth.isConnected = jest.fn(() => true);
        expect(
            shallow(<Search/>)
                .find('section.Search')
                .length
        ).toBe(1)
    });

    it('Search not connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => false);
        const component = renderer.create(
            <Router>
                <Search/>
            </Router>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('Search connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => true);
        const component = renderer.create(
            <Router>
                <Search/>
            </Router>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

});