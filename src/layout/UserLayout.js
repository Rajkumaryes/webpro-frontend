import React, { useEffect } from 'react';
import loginBg from '../assets/img/login/LoginBg.jpg'

const UserLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);

  return (
    <>
      <div className="fixed-background" style = {{backgroundImage :`url(${loginBg})`,backgroundRepeat:'round'}}/>
      <div className="fullbackground" />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
};

export default UserLayout;
