import React from 'react';
import { shallow } from 'enzyme';
import Login from '../user/login';

describe('Login component tests', ()=> {
    const wrapper = shallow(<Login />);
 
    it('should have an empty username and password state var', ()=> {
        //Optionally test to check if password and email are empty strings on 
           setup
        expect(wrapper.state('username')).toEqual('');
        expect(wrapper.state('password')).toEqual('');
    });

  

});

