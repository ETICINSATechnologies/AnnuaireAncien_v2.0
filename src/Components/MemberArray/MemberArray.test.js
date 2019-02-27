import React from 'react';
import MemberArray from './MemberArray';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Auth from '../../Components/Auth/Auth';

Enzyme.configure({adapter: new Adapter()});

describe( 'MemberArray component', () => {
    it('renders without crashing', () => {
            const tree = renderer.create(<MemberArray />).toJSON();
            expect(tree).toMatchSnapshot();
        }
    );

    it('MemberArray unit test', () => {
        expect(Enzyme.shallow(<MemberArray/>)
            .find('.MemberArray')
            .length
        ).toBe(1)
    });

});