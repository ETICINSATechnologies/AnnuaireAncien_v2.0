import React from 'react';
import Nav from './Nav';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from "../Auth/Auth";



Enzyme.configure({adapter: new Adapter()});

describe( 'Nav component', () => {
    it('renders without crashing', () => {
            const tree = renderer.create(<Nav />).toJSON();
            expect(tree).toMatchSnapshot();
        }
    );

    it('Nav unit test', () => {
        expect(Enzyme.shallow(<Nav/>)
            .find('nav')
            .length
        ).toBe(1)
    });
    
});