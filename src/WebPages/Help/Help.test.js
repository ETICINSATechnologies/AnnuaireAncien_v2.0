import React from 'react';

import Help from './Help';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from "../../Components/Auth/Auth";
import {BrowserRouter as Router} from "react-router-dom";



Enzyme.configure({adapter: new Adapter()});

describe( 'Help component', () => {
    it('renders without crashing', () => {
            const tree = renderer.create(<Help />).toJSON();
            expect(tree).toMatchSnapshot();
        }
    );

    it('Help unit test', () => {
        expect(
            Enzyme.shallow(<Help/>)
                .find('div.Help')
                .length
        ).toBe(1)
    });

    it('Help button test', () => {
            const wrapper = Enzyme.shallow(<Help />);
            expect( wrapper.find('Nav').length ).toBe(1);
        }
    );

    it('Help not connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => false);
        const component = renderer.create(<Help/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('Help connected snapshot test', () => {
        Auth.isConnected = jest.fn(() => true);
        const component = renderer.create(<Help/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});