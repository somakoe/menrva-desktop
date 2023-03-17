import { Button } from '@components/elements/Button';
import TextInput from '@components/elements/inputs/TextInput';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Login = ({ auth, setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logIn = useCallback(async () => {
    try {
      // eslint-disable-next-line react/prop-types
      const response = await auth.logIn(username, password);
      if (response.name !== null) {
        setLoggedIn(true);
      }
    } catch (e) {
      // Todo: Handle error
      // eslint-disable-next-line no-console
      console.dir(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password]);

  return (
    <>
      <div className="login-wrapper bg-success">
        <div className="bg-pic">
          <div className="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-l-20 m-b-20">
            <h1 className="semi-bold">
              Menrva - A modern tool for both big and small health institutions.
            </h1>
            <p className="small">
              Software suite is to enable medical practitioners manage their
              work and provide a comprehensive interfaces and streamline use
              cases to make work seamless and have your focus reverted to the
              patients.
            </p>
          </div>
        </div>

        <div className="login-container bg-white">
          <div className="p-l-50 p-r-50 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
            <div>
              <h4 className="text-success no-margin no-padding font-montserrat bold p-r-5">
                Menrva <span className="text-black light">+</span>
              </h4>
              <h4 className="text-success no-margin no-padding font-montserrat bold p-r-5">
                Komfo Anokye Teaching Hospital
              </h4>
            </div>
            <h2 className="p-t-25">
              Welcome, <br /> to your work dashboard
            </h2>
            <p className="mw-80 m-t-10">Sign in to your hospital</p>

            <form className="p-t-15">
              <div className="form-group form-group-default">
                <label>Login</label>
                <div className="controls">
                  <TextInput
                    type="text"
                    name="username"
                    onChange={setUsername}
                    placeholder="User Name"
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="form-group form-group-default m-b-30">
                <label>Password</label>
                <div className="controls">
                  <TextInput
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={setPassword}
                    placeholder="Credentials"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6 d-flex align-items-center justify-content-end pull-right">
                <Button
                  aria-label=""
                  className="btn btn-primary btn-lg m-t-10"
                  onClick={logIn}
                  type="button"
                >
                  Sign in
                </Button>
              </div>
              <div className="m-b-5 m-t-15">
                <Link to="/" className="normal">
                  Lost your password?
                </Link>
              </div>
            </form>

            <div className="pull-bottom sm-pull-bottom">
              <div className="m-b-30 p-r-80 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix">
                <div className="col-sm-9 no-padding m-t-10">
                  <p className="small-text normal hint-text">
                    ©2019-2020 All Rights Reserved. Menrva is a registered
                    trademark of Teinc Studios.{' '}
                    <Link to="/">Cookie Policy</Link>,{' '}
                    <Link to="/"> Privacy and Terms</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
