import React from 'react';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount } from 'enzyme';
import { LoginScreen } from '../../../components/auth/LoginScreen';


configure({ adapter: new Adapter() });

describe('Pruebas en componente <LoginScreen/>', () => {

    const wrapper = mount( <LoginScreen/> );
    //expect( wrapper ).toMatchSnapshot(); 

    // test('should first', () => {
    // });
    

})