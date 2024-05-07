import classNames from 'classnames/bind';
import { Checkbox } from '../../../../../components/Checkbox';
import { Input } from '../../../../../components/Input';
import styles from './RegisterFields.module.css';

const cx = classNames.bind(styles);

export interface RegisterState {
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
export type RegisterFieldActions =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'SET_CREATE_PASSWORD'; payload: string }
  | { type: 'SET_REPEAT_PASSWORD'; payload: string }
  | { type: 'SET_EMAIL_ERROR_MSG'; payload: string }
  | { type: 'SET_USER_NAME_ERROR_MSG'; payload: string }
  | { type: 'SET_CREATE_PASSWORD_ERROR_MSG'; payload: string }
  | { type: 'SET_REPEAT_PASSWORD_ERROR_MSG'; payload: string }
  | { type: 'SET_COMMUNITY_RULES_ERROR_MSG'; payload: string }
  | { type: 'SET_COMMUNITY_RULES'; payload: string };

type RegisterFieldsProps = {
  state: RegisterState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    valueType: RegisterFieldActions['type'],
    errorValueType: RegisterFieldActions['type']
  ) => void;
};

export function RegisterFields({ state, handleChange }: RegisterFieldsProps) {
  const {
    email,
    userName,
    createPassword,
    repeatPassword,
    emailErrorMsg,
    userNameErrorMsg,
    createPasswordErrorMsg,
    repeatPasswordErrorMsg,
    communityRulesErrorMsg,
  } = state;
  return (
    <>
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
      <div className={cx('input-checkbox')}>
        <Checkbox
          label="I have read the"
          id="Community Rules"
          onChange={(event) => {
            handleChange(event, 'SET_COMMUNITY_RULES', 'SET_COMMUNITY_RULES_ERROR_MSG');
          }}
          isError={!!communityRulesErrorMsg}
          errorMessage={communityRulesErrorMsg}
        />
        <button type="button" className={cx('community-rules')}>
          Community Rules
        </button>
      </div>
    </>
  );
}
