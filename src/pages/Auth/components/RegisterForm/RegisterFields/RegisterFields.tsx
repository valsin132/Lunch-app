import classNames from 'classnames/bind';
import { Checkbox } from '../../../../../components/Checkbox';
import { Input } from '../../../../../components/Input';
import { RegisterFieldActions, RegisterState } from '../../../../../hooks/useRegisterData';
import styles from './RegisterFields.module.css';

const cx = classNames.bind(styles);

interface RegisterFieldsProps {
  state: RegisterState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    valueType: RegisterFieldActions['type'],
    errorValueType: RegisterFieldActions['type']
  ) => void;
  handleCommunityRulesChange: () => void;
}

export function RegisterFields({
  state,
  handleChange,
  handleCommunityRulesChange: handleCommunityRules,
}: RegisterFieldsProps) {
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
        onChange={(event) => handleChange(event, 'email', 'emailErrorMsg')}
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
        onChange={(event) => handleChange(event, 'userName', 'userNameErrorMsg')}
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
        onChange={(event) => handleChange(event, 'createPassword', 'createPasswordErrorMsg')}
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
        onChange={(event) => handleChange(event, 'repeatPassword', 'repeatPasswordErrorMsg')}
        aria-required="true"
        aria-label="Create password Input Field"
        isError={!!repeatPasswordErrorMsg}
        errorMessage={repeatPasswordErrorMsg}
      />
      <div className={cx('input-checkbox')}>
        <Checkbox
          label="I have read the"
          id="Community Rules"
          onChange={handleCommunityRules}
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
