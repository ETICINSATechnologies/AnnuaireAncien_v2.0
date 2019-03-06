import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';
import {BrowserRouter as Router} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

describe('Home unit tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(shallow(
            <Router>
                <Home/>
            </Router>), div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Home unit test', () => {
        expect(
            Enzyme.shallow(<Home/>)
                .find('div.Home')
                .length
        ).toBe(1)
    });

    it('Home not connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => false);

        const component = renderer.create(shallow(
            <Router>
                <Home/>
            </Router>));
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('Home connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => true);

        const component = renderer.create(shallow(
            <Router>
                <Home/>
            </Router>));
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    })
});
