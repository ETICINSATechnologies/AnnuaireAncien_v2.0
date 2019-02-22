import React from 'react';

import Help from './Help';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';


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
            const expected = ["home","search","profile","disconnection"];
            expect( wrapper.find('Nav').length ).toBe(1);
        }
    );

});