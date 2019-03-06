import React from 'react';
import Search from './Search';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';
import {Router} from "react-router-dom";

Enzyme.configure({adapter: new Adapter()});

describe( 'Search component', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(<Search />).toJSON();
        expect(tree).toMatchSnapshot();
        }
    );

    it('Search unit test', () => {
        expect(Enzyme.shallow(<Search/>)
            .find('div.Search')
            .length
        ).toBe(1)
    });

    it('Search not connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => false);
        // const component = renderer.create(<Search/>);
        const component = document.createElement('div');
        ReactDOM.render(shallow(
            <Router>
                <Search/>
            </Router>), component);
        let tree = component.toJSON();
        // let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('Search connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => true);
        const component = renderer.create(<Search/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    })

});