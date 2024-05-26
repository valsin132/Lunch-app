import classNames from 'classnames/bind';
import { useState } from 'react';
import { Checkbox } from '../../../../../components/Checkbox';
import { Input } from '../../../../../components/Input';
import { RegisterFieldActions, RegisterState } from '../../../../../hooks/useRegisterData';
import { Modal } from '../../../../../components/Modal';
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
  const [modalOpen, setModalOpen] = useState(false);

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
          isChecked={isCommunityRulesChecked}
          onChange={(event) =>
            handleFormChange(event, 'isCommunityRulesChecked', 'communityRulesErrorMsg')
          }
          isError={!!communityRulesErrorMsg}
          errorMessage={communityRulesErrorMsg}
        />
        <button
          type="button"
          className={cx('register-inputs__community-rules')}
          onClick={() => setModalOpen(true)}>
          Community Rules
        </button>
      </div>
      {modalOpen && (
        <Modal
          title="Community rules"
          modalSize="md"
          setIsOpenModal={setModalOpen}
          primaryButtonLabel="Close"
          onClick={() => setModalOpen(false)}
          isSmallerUpperGap>
          <p className={cx('register-inputs__modal')}>
            Cognizant Technology Solutions Corporation and its affiliated companies (“Cognizant”
            “we” or “us”) are firmly committed to protecting your privacy. You should understand
            what we do with data relating to you (“personal information”) which we collect when you
            visit this website (cognizant.com), our country-specific sites or any other websites to
            which this Cognizant Website Privacy Notice (“Privacy Notice”) applies (collectively,
            the “Sites”). As a global company, Cognizant has a number of legal entities in different
            jurisdictions which are responsible for the personal information which they collect
            independently and which may be processed on their behalf by Cognizant Technology
            Solutions U.S. Corporation and its affiliates. The data controller for personal
            information collected from a visitor to the Sites is Cognizant Technology Solutions U.S.
            Corporation, 211 Quality Circle, College Station, Texas, United States of America or the
            affiliate specified on the Site that references this Privacy Notice. <br /> <br /> We
            may supplement this Privacy Notice to address specific situations. All supplemental
            notices should be read together with this Privacy Notice.
          </p>
        </Modal>
      )}
    </div>
  );
}
