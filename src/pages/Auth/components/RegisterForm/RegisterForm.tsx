import React, { useReducer, useState } from 'react';
import classNames from 'classnames/bind';
import { Input } from '../../../../components/Input';
import { Checkbox } from '../../../../components/Checkbox';
import { Button } from '../../../../components/Button';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../../../constants';
import styles from './RegisterForm.module.css';

const cx = classNames.bind(styles);

interface State {
  email: string;
  userName: string;
  createPassword: string;
  repeatPassword: string;
  communityRules: boolean;
  emailErrorMsg: string;
  userNameErrorMsg: string;
  createPasswordErrorMsg: string;
  repeatPasswordErrorMsg: string;
  communityRulesErrorMsg: string;
}

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

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'SET_CREATE_PASSWORD'; payload: string }
  | { type: 'SET_REPEAT_PASSWORD'; payload: string }
  | { type: 'SET_EMAIL_ERROR_MSG'; payload: string }
  | { type: 'SET_USER_NAME_ERROR_MSG'; payload: string }
  | { type: 'SET_CREATE_PASSWORD_ERROR_MSG'; payload: string }
  | { type: 'SET_REPEAT_PASSWORD_ERROR_MSG'; payload: string }
  | { type: 'SET_COMMUNITY_RULES_ERROR_MSG'; payload: string };

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    case 'SET_CREATE_PASSWORD':
      return { ...state, createPassword: action.payload };
    case 'SET_REPEAT_PASSWORD':
      return { ...state, repeatPassword: action.payload };
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

// eslint-disable-next-line max-lines-per-function
export function RegisterForm({ handleRegistration }: RegisterFormProps) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const {
    email,
    userName,
    createPassword,
    repeatPassword,
    communityRules,
    emailErrorMsg,
    userNameErrorMsg,
    createPasswordErrorMsg,
    repeatPasswordErrorMsg,
    communityRulesErrorMsg,
  } = state;
  const setReducerState = (type: Action['type'], value: string) =>
    dispatch({ type, payload: value });
  const [isRulesChecked, setIsRulesChecked] = useState(communityRules);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    valueType: Action['type'],
    errorValueType: Action['type']
  ) => {
    setReducerState(valueType, e.target.value);
    setReducerState(errorValueType, '');
  };

  const handleCommunityRulesChange = () => {
    setIsRulesChecked(!isRulesChecked);
    if (isRulesChecked === false) {
      setReducerState('SET_COMMUNITY_RULES_ERROR_MSG', '');
    } else {
      setReducerState('SET_COMMUNITY_RULES_ERROR_MSG', 'Please accept the rules.');
    }
  };
  const handleCreateAccount = () => {
    if (
      email &&
      EMAIL_REGEX.test(email) &&
      PASSWORD_REGEX.test(createPassword) &&
      PASSWORD_REGEX.test(repeatPassword) &&
      createPassword === repeatPassword &&
      userName &&
      isRulesChecked
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
      }
      if (isRulesChecked === true) {
        setReducerState('SET_COMMUNITY_RULES_ERROR_MSG', '');
      } else {
        setReducerState('SET_COMMUNITY_RULES_ERROR_MSG', 'Please accept the rules.');
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
          <Input
            id="email"
            textFieldType="email"
            placeholder="Your email"
            label="Your email"
            value={email}
            name="email"
            onChange={(event) => handleChange(event, 'SET_EMAIL', 'SET_EMAIL_ERROR_MSG')}
            aria-required="true"
            aria-label="Email Input Field"
            isError={!!emailErrorMsg}
            errorMessage={emailErrorMsg}
          />
          <Input
            id="userName"
            textFieldType="text"
            placeholder="User name"
            label="Create user name"
            value={userName}
            name="userName"
            onChange={(event) => handleChange(event, 'SET_USER_NAME', 'SET_USER_NAME_ERROR_MSG')}
            aria-required="true"
            aria-label="User name Input Field"
            isError={!!userNameErrorMsg}
            errorMessage={userNameErrorMsg}
          />
          <Input
            id="createPassword"
            textFieldType="password"
            placeholder="Create your password"
            label="Create Password"
            value={createPassword}
            name="createPassword"
            onChange={(event) =>
              handleChange(event, 'SET_CREATE_PASSWORD', 'SET_CREATE_PASSWORD_ERROR_MSG')
            }
            aria-required="true"
            aria-label="Create password Input Field"
            isError={!!createPasswordErrorMsg}
            errorMessage={createPasswordErrorMsg}
          />
          <Input
            id="repeatPassword"
            textFieldType="password"
            placeholder="Repeat your password"
            label="Repeat Password"
            value={repeatPassword}
            name="repeatPassword"
            onChange={(event) =>
              handleChange(event, 'SET_REPEAT_PASSWORD', 'SET_REPEAT_PASSWORD_ERROR_MSG')
            }
            aria-required="true"
            aria-label="Create password Input Field"
            isError={!!repeatPasswordErrorMsg}
            errorMessage={repeatPasswordErrorMsg}
          />
          <div className={cx('register-form__input-checkbox')}>
            <Checkbox
              label="I have read the"
              id="Community Rules"
              onChange={handleCommunityRulesChange}
              isError={!!communityRulesErrorMsg}
              errorMessage={communityRulesErrorMsg}
            />
            <button type="button" aria-label="Community Rules" className={cx('community-rules')}>
              Community Rules
            </button>
          </div>
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
