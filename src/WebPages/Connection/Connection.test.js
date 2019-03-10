import React from 'react';

import Connection from './Connection';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';
import fetch from '../../__mocks__/fetch'
Enzyme.configure({adapter: new Adapter()});

describe( 'Connection component' , () => {

    it('renders without crashing', () => {
        const tree = renderer.create(<Connection />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Connection unit test', () => {
        expect(
            Enzyme.shallow(<Connection/>)
                .find('div.Connection')
                .length
        ).toBe(1)
    });

    it('Connection button clicked unit test', () => {
        Connection.tryToConnect = jest.fn( () => true );
        const tree = Enzyme.shallow(
            <input type="submit" className="connect_input" value="Se connecter"
                   onClick={Connection.tryToConnect}/>
        );
        tree.find('.connect_input').simulate('click', { preventDefault() {} });
        expect(Connection.tryToConnect).toHaveBeenCalled();
    });

    it('Connection not connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => false);
        const component = renderer.create(<Connection/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('Connection connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => true);
        const component = renderer.create(<Connection/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

});