import { useReducer } from 'react';
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
  communityRules: string;
  emailErrorMsg: string;
  userNameErrorMsg: string;
  createPasswordErrorMsg: string;
  repeatPasswordErrorMsg: string;
  communityRulesErrorMsg: string;
}

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'SET_CREATE_PASSWORD'; payload: string }
  | { type: 'SET_REPEAT_PASSWORD'; payload: string }
  | { type: 'SET_COMMUNITY_RULES'; payload: string }
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
    case 'SET_COMMUNITY_RULES':
      return { ...state, communityRules: action.payload };
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

interface RegisterProps {
  handleLogin: () => void;
}

export function RegisterForm({ handleLogin }: RegisterProps) {
  const initialState = {
    email: '',
    userName: '',
    createPassword: '',
    repeatPassword: '',
    communityRules: '',
    emailErrorMsg: '',
    userNameErrorMsg: '',
    createPasswordErrorMsg: '',
    repeatPasswordErrorMsg: '',
    communityRulesErrorMsg: '',
  };

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

  const setEmail = (value: string) => dispatch({ type: 'SET_EMAIL', payload: value });
  const setUserName = (value: string) => dispatch({ type: 'SET_USER_NAME', payload: value });
  const setCreatePassword = (value: string) =>
    dispatch({ type: 'SET_CREATE_PASSWORD', payload: value });
  const setRepeatPassword = (value: string) =>
    dispatch({ type: 'SET_REPEAT_PASSWORD', payload: value });
  const setCommunityRules = (value: string) =>
    dispatch({ type: 'SET_COMMUNITY_RULES', payload: value });
  const setEmailErrorMsg = (value: string) =>
    dispatch({ type: 'SET_EMAIL_ERROR_MSG', payload: value });
  const setUserNameErrorMsg = (value: string) =>
    dispatch({ type: 'SET_USER_NAME_ERROR_MSG', payload: value });
  const setCreatePasswordErrorMsg = (value: string) =>
    dispatch({ type: 'SET_CREATE_PASSWORD_ERROR_MSG', payload: value });
  const setRepeatPasswordErrorMsg = (value: string) =>
    dispatch({ type: 'SET_REPEAT_PASSWORD_ERROR_MSG', payload: value });
  const setCommunityRulesErrorMsg = (value: string) =>
    dispatch({ type: 'SET_COMMUNITY_RULES_ERROR_MSG', payload: value });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailErrorMsg('');
  };
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setUserNameErrorMsg('');
  };
  const handleCreatePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreatePassword(e.target.value);
    setCreatePasswordErrorMsg('');
  };
  const handleReapeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
    setRepeatPasswordErrorMsg('');
  };
  const handleCommunityRulesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityRules(e.target.value);
    setCommunityRulesErrorMsg('');
  };
  const handleCreatePasswordCharacters = () => {
    if (!PASSWORD_REGEX.test(createPassword)) {
      setCreatePasswordErrorMsg(
        'Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter and one number.'
      );
    } else {
      setCreatePasswordErrorMsg('');
    }
    if (!PASSWORD_REGEX.test(repeatPassword)) {
      setRepeatPasswordErrorMsg(
        'Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter and one number.'
      );
    } else {
      setRepeatPasswordErrorMsg('');
    }
    if (createPassword !== repeatPassword && repeatPassword !== '') {
      setRepeatPasswordErrorMsg("Password doesn't match. Please check it.");
    } else {
      setRepeatPasswordErrorMsg('');
    }
  };
  const handleRegister = () => {
    if (!email) {
      setEmailErrorMsg('Please enter your email.');
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailErrorMsg('Invalid email address');
    } else {
      setEmailErrorMsg('');
    }
    if (!userName) {
      setUserNameErrorMsg('Please enter your user name.');
    } else {
      setUserNameErrorMsg('');
    }
    if (!createPassword) {
      setCreatePasswordErrorMsg('Please enter your password.');
    } else {
      setCreatePasswordErrorMsg('');
    }
    if (!repeatPassword) {
      setRepeatPasswordErrorMsg('Please repeat your password.');
    } else {
      setRepeatPasswordErrorMsg('');
    }
    if (!communityRules) {
      setCommunityRulesErrorMsg('Please accept the rules.');
    } else {
      setCommunityRulesErrorMsg('');
    }
    if (
      email &&
      EMAIL_REGEX.test(email) &&
      PASSWORD_REGEX.test(createPassword) &&
      PASSWORD_REGEX.test(repeatPassword) &&
      userName &&
      communityRules
    ) {
      handleLogin();
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
            onChange={handleEmailChange}
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
            onChange={handleUserNameChange}
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
            onChange={handleCreatePasswordChange}
            onBlur={handleCreatePasswordCharacters}
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
            onChange={handleReapeatPasswordChange}
            onBlur={handleCreatePasswordCharacters}
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
        onClick={handleRegister}
      />
    </form>
  );
}
