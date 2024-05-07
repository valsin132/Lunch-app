import React, { useReducer } from 'react';
import classNames from 'classnames/bind';
import { Button } from '../../../../components/Button';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../../../constants';
import { RegisterFieldActions, RegisterFields, RegisterState } from './RegisterFields';
import styles from './RegisterForm.module.css';

const cx = classNames.bind(styles);

const initialState = {
  email: '',
  userName: '',
  createPassword: '',
  repeatPassword: '',
  communityRules: false,
  emailErrorMsg: '',
  userNameErrorMsg: '',
  createPasswordErrorMsg: '',
  repeatPasswordErrorMsg: '',
  communityRulesErrorMsg: '',
};

const formReducer = (state: RegisterState, action: RegisterFieldActions): RegisterState => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    case 'SET_CREATE_PASSWORD':
      return { ...state, createPassword: action.payload };
    case 'SET_REPEAT_PASSWORD':
      return { ...state, repeatPassword: action.payload };
    case 'SET_COMMUNITY_RULES':
      return {
        ...state,
        communityRules: !state.communityRules,
        communityRulesErrorMsg: state.communityRules ? '' : state.communityRulesErrorMsg,
      };
    case 'SET_EMAIL_ERROR_MSG':
      return { ...state, emailErrorMsg: action.payload };
    case 'SET_USER_NAME_ERROR_MSG':
      return { ...state, userNameErrorMsg: action.payload };
    case 'SET_CREATE_PASSWORD_ERROR_MSG':
      return { ...state, createPasswordErrorMsg: action.payload };
    case 'SET_REPEAT_PASSWORD_ERROR_MSG':
      return { ...state, repeatPasswordErrorMsg: action.payload };
    case 'SET_COMMUNITY_RULES_ERROR_MSG':
      return { ...state, communityRulesErrorMsg: action.payload };
    default:
      return state;
  }
};
interface RegisterFormProps {
  handleRegistration: () => void;
}

export function RegisterForm({ handleRegistration }: RegisterFormProps) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { email, userName, createPassword, repeatPassword, communityRules } = state;
  const setReducerState = (type: RegisterFieldActions['type'], value: string) =>
    dispatch({ type, payload: value });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    valueType: RegisterFieldActions['type'],
    errorValueType: RegisterFieldActions['type']
  ) => {
    setReducerState(valueType, e.target.value);
    setReducerState(errorValueType, '');
  };

  const handleCreateAccount = () => {
    if (
      email &&
      EMAIL_REGEX.test(email) &&
      PASSWORD_REGEX.test(createPassword) &&
      createPassword === repeatPassword &&
      userName &&
      communityRules
    ) {
      handleRegistration();
    } else {
      if (!email) {
        setReducerState('SET_EMAIL_ERROR_MSG', 'Please enter your email.');
      } else if (!EMAIL_REGEX.test(email)) {
        setReducerState('SET_EMAIL_ERROR_MSG', 'Invalid email address.');
      }
      if (!userName) {
        setReducerState('SET_USER_NAME_ERROR_MSG', 'Please enter your user name.');
      }
      if (!createPassword) {
        setReducerState('SET_CREATE_PASSWORD_ERROR_MSG', 'Please enter your password.');
      } else if (!PASSWORD_REGEX.test(createPassword)) {
        setReducerState(
          'SET_CREATE_PASSWORD_ERROR_MSG',
          'Password must consist of a minimum of 8 characters, one uppercase, lowercase letters, number and a special symbol.'
        );
      }
      if (!repeatPassword) {
        setReducerState('SET_REPEAT_PASSWORD_ERROR_MSG', 'Please repeat your password.');
      } else if (createPassword !== repeatPassword) {
        setReducerState(
          'SET_REPEAT_PASSWORD_ERROR_MSG',
          "Password doesn't match. Please check it."
        );
      } else {
        setReducerState('SET_REPEAT_PASSWORD_ERROR_MSG', '');
      }
      if (!communityRules) {
        setReducerState('SET_COMMUNITY_RULES_ERROR_MSG', 'Please accept the rules');
      } else {
        setReducerState('SET_COMMUNITY_RULES_ERROR_MSG', '');
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
        <div className={cx('register-form__input')}>
          <RegisterFields handleChange={handleChange} state={state} />
        </div>
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
