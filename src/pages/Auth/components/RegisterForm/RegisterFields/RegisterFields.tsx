import classNames from 'classnames/bind';
import { Checkbox } from '../../../../../components/Checkbox';
import { Input } from '../../../../../components/Input';
import { RegisterFieldActions, RegisterState } from '../../../../../hooks/useRegisterData';
import styles from './RegisterFields.module.css';

const cx = classNames.bind(styles);

interface RegisterFieldsProps {
  state: RegisterState;
  handleFormChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    valueType: RegisterFieldActions['type'],
    errorValueType: RegisterFieldActions['type']
  ) => void;
}

export function RegisterFields({ state, handleFormChange }: RegisterFieldsProps) {
  const {
    email,
    userName,
    createPassword,
    repeatPassword,
    isCommunityRulesChecked,
    emailErrorMsg,
    userNameErrorMsg,
    createPasswordErrorMsg,
    repeatPasswordErrorMsg,
    communityRulesErrorMsg,
  } = state;
  return (
    <div className={cx('register-inputs')}>
      <Input
        id="email"
        textFieldType="email"
        placeholder="Your email"
        label="Your email"
        value={email}
        name="email"
        onChange={(event) => handleFormChange(event, 'email', 'emailErrorMsg')}
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
        onChange={(event) => handleFormChange(event, 'userName', 'userNameErrorMsg')}
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
        onChange={(event) => handleFormChange(event, 'createPassword', 'createPasswordErrorMsg')}
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
        onChange={(event) => handleFormChange(event, 'repeatPassword', 'repeatPasswordErrorMsg')}
        aria-required="true"
        aria-label="Create password Input Field"
        isError={!!repeatPasswordErrorMsg}
        errorMessage={repeatPasswordErrorMsg}
      />
      <div className={cx('register-inputs__checkbox')}>
        <Checkbox
          label="I have read the"
          id="Community Rules"
          checked={isCommunityRulesChecked}
          onChange={(event) =>
            handleFormChange(event, 'isCommunityRulesChecked', 'communityRulesErrorMsg')
          }
          isError={!!communityRulesErrorMsg}
          errorMessage={communityRulesErrorMsg}
        />
        <button type="button" className={cx('register-inputs__community-rules')}>
          Community Rules
        </button>
      </div>
    </div>
  );
}
