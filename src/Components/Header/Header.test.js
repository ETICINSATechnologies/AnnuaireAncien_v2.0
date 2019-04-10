import React from 'react';
import Header from './Header';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';

Enzyme.configure({adapter: new Adapter()});

describe('Header component', () => {
    it('renders without crashing', () => {
            const tree = renderer.create(<Header/>).toJSON();
            expect(tree).toMatchSnapshot();
        }
    );

    it('Header unit test', () => {
        expect(Enzyme.shallow(<Header/>)
            .find('.Header')
            .length
        ).toBe(1)
    });

});