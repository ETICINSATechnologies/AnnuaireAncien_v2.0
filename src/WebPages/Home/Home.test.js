import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';

Enzyme.configure({adapter: new Adapter()});

describe('Home unit tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Home/>, div);
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

        const component = renderer.create(<Home/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('Home connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => true);

        const component = renderer.create(<Home/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    })
});


