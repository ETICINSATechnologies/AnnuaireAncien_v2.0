import React from 'react';
import MemberDisplay from './MemberDisplay';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';


Enzyme.configure({adapter: new Adapter()});

describe( 'MemberDisplay component', () => {
    it('renders without crashing', () => {
            const tree = renderer.create(<MemberDisplay />).toJSON();
            expect(tree).toMatchSnapshot();
        }
    );

    it('MemberDisplay unit test', () => {
        expect(Enzyme.shallow(<MemberDisplay/>)
            .find('.MemberDisplay')
            .length
        ).toBe(1)
    });

});