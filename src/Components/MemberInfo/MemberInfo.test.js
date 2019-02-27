import React from 'react';
import MemberInfo from './MemberInfo';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';


Enzyme.configure({adapter: new Adapter()});

describe( 'MemberInfo component', () => {
    it('renders without crashing', () => {
            const tree = renderer.create(<MemberInfo />).toJSON();
            expect(tree).toMatchSnapshot();
        }
    );

    it('MemberInfo unit test', () => {
        expect(Enzyme.shallow(<MemberInfo/>)
            .find('.MemberInfo')
            .length
        ).toBe(1)
    });

});