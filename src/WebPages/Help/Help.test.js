import React from 'react';
import ReactDOM from 'react-dom';
import Help from './Help';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';
import {BrowserRouter as Router} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

describe('Help unit tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(shallow(
            <Router>
                <Help/>
            </Router>), div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Help unit test', () => {
        expect(
            Enzyme.shallow(<Help/>)
                .find('div.Help')
                .length
        ).toBe(1)
    });

    it('Help not connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => false);

        const component = renderer.create(shallow(
            <Router>
                <Help/>
            </Router>));
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('Help connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => true);

        const component = renderer.create(shallow(
            <Router>
                <Help/>
            </Router>));
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    })
});
