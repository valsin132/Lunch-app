import React from 'react';
import classNames from 'classnames/bind';
import { Button } from '../../../../components/Button';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../../../constants';
import { RegisterFields } from './RegisterFields';
import { RegisterFieldActions, useRegisterData } from '../../../../hooks/useRegisterData';
import { useRegister } from '../../../../hooks/useRegister';
import styles from './RegisterForm.module.css';

const cx = classNames.bind(styles);

interface RegisterFormProps {
  handleRegistration: () => void;
}

export function RegisterForm({ handleRegistration }: RegisterFormProps) {
  const { state, dispatch } = useRegisterData();
  const { updateUser } = useRegister();

  const { email, userName, createPassword, repeatPassword, isCommunityRulesChecked } = state;

  const setReducerState = (type: RegisterFieldActions['type'], value: string | boolean) =>
    dispatch({ type, payload: value });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    valueType: RegisterFieldActions['type'],
    errorValueType: RegisterFieldActions['type']
  ) => {
    if (typeof state[valueType] === 'string') {
      setReducerState(valueType, e.target.value);
    } else if (typeof state[valueType] === 'boolean') {
      setReducerState(valueType, e.target.checked);
    }
    setReducerState(errorValueType, '');
  };

  const handleCreateAccount = () => {
    if (
      EMAIL_REGEX.test(email) &&
      PASSWORD_REGEX.test(createPassword) &&
      createPassword === repeatPassword &&
      userName &&
      isCommunityRulesChecked
    ) {
      updateUser(email, createPassword);
      handleRegistration();
    } else {
      if (!email) {
        setReducerState('emailErrorMsg', 'Please enter your email.');
      } else if (!EMAIL_REGEX.test(email)) {
        setReducerState('emailErrorMsg', 'Invalid email address.');
      }
      if (!userName) {
        setReducerState('userNameErrorMsg', 'Please enter your user name.');
      }
      if (!createPassword) {
        setReducerState('createPasswordErrorMsg', 'Please enter your password.');
      } else if (!PASSWORD_REGEX.test(createPassword)) {
        setReducerState(
          'createPasswordErrorMsg',
          'Password must consist of a minimum of 8 characters, one uppercase, lowercase letters, number and a special symbol.'
        );
      }
      if (!repeatPassword) {
        setReducerState('repeatPasswordErrorMsg', 'Please repeat your password.');
      } else if (createPassword !== repeatPassword) {
        setReducerState('repeatPasswordErrorMsg', "Password doesn't match. Please check it.");
      }
      if (!isCommunityRulesChecked) {
        setReducerState('communityRulesErrorMsg', 'Please accept the rules');
      }
    }
  };
  return (
    <form className={cx('register-form')} aria-label="Register Form">
      <div className={cx('register-form__container')}>
        <div className={cx('register-form__head')}>
          <h1>Register</h1>
          <p>Join our office foodies today!</p>
        </div>
        <RegisterFields handleFormChange={handleFormChange} state={state} />
      </div>
      <Button
        title="Create Account"
        buttonSize="md"
        buttonType="primary"
        buttonWidth="full"
        onClick={handleCreateAccount}
      />
    </form>
  );
}
