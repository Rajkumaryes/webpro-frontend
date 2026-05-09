import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { resetPassword } from '../../redux/actions';
import { NotificationManager } from '../../components/common/react-notifications';
import HapagLogo from '../../assets/logos/Hapag-Lloyd-Logo.png'
import Eyeopen from '../../assets/img/app_image/eyeopen.png'
import Eyeclose from '../../assets/img/app_image/eyeclose.png'
import login_image from '../../assets/img/login/login_image.jpg'
const validateNewPassword = (values) => {
  const { password, newPasswordAgain } = values;
  const errors = {};
  if (newPasswordAgain && password !== newPasswordAgain) {
    errors.newPasswordAgain = 'New password and Confirm password does not match';
  }
  return errors;
};

const ResetPassword = ({
  location,
  history,
  loading,
  error,
  resetPasswordAction,
}) => {
  const [password] = useState('');
  const [newPasswordAgain] = useState('');

  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        'Forgot Password Error',
        3000,
        null,
        null,
        ''
      );
    } else if (!loading && password === 'success')
      NotificationManager.success(
        'Please login with your new password.',
        'Reset Password Success',
        3000,
        null,
        null,
        ''
      );
  }, [error, loading, password]);

  const onResetPassword = (values) => {
    if (!loading) {
      
      const { pathname } = location;
      const encryptstring = pathname.substring(pathname.lastIndexOf('/') + 1)
      if (encryptstring) {
        
        if (values.password !== '') {
          resetPasswordAction({
            password: values.password,
            resetPasswordCode: encryptstring,
            history,
          });
        }
      } else {
        NotificationManager.warning(
          'Please check your email url.',
          'Reset Password Error',
          3000,
          null,
          null,
          ''
        );
      }
    }
  };

  const initialValues = { password, newPasswordAgain };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side " style = {{backgroundImage :`url(${login_image})`,backgroundRepeat:'round'}}>
            
          </div>
          <div className="form-side">
            
          <div className = "login-web-hide">
              <div className = "row" style = {{margin:'12px 0px'}}>
                    <div className = "col-md-7">
                       <img src={HapagLogo} alt="thumbnail"
                        style = {{width:'100%',marginLeft:'-22px',marginTop:'-15px'}} />
                    </div>
                   <div className = "col-md-5">
                    <p className = "fontstyle login-lbl forget-lbl-font">Reset Password</p>
                  </div>

              </div>
            </div>

            <Formik
              validate={validateNewPassword}
              initialValues={initialValues}
              onSubmit={onResetPassword}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                     {'New Password'}
                    </Label>
                    <Field
                      className="form-control"
                      name="password"
                      type="password"
                    />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      {'Confirm Password'}
                    </Label>
                    <Field
                      className="form-control"
                      name="newPasswordAgain"
                      type="password"
                    />
                    {errors.newPasswordAgain && touched.newPasswordAgain && (
                      <div className="invalid-feedback d-block">
                        {errors.newPasswordAgain}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/login">
                      <IntlMessages id="user.login-title" />
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.reset-password-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { password, resetPasswordCode, loading, error } = authUser;
  return { password, resetPasswordCode, loading, error };
};

export default connect(mapStateToProps, {
  resetPasswordAction: resetPassword,
})(ResetPassword);
