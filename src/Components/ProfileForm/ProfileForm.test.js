import React from 'react';
import ProfileForm from './ProfileForm';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';


Enzyme.configure({adapter: new Adapter()});

describe( 'ProfileForm component', () => {
    it('renders without crashing', () => {
            const tree = renderer.create(<ProfileForm />).toJSON();
            expect(tree).toMatchSnapshot();
        }
    );

    it('ProfileForm unit test', () => {
        expect(Enzyme.shallow(<ProfileForm/>)
            .find('.ProfileForm')
            .length
        ).toBe(1)
    });

});