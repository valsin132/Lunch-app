import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import { Modal } from '../../../../../components/Modal';
import styles from './CommunityRulesModal.module.css';

const cx = classNames.bind(styles);

interface CommunityRulesModalProps {
  setIsOpen: () => void;
  onClick: () => void;
}

export function CommunityRulesModal({
  setIsOpen,
  onClick,
}: CommunityRulesModalProps): ReactElement {
  return (
    <Modal
      title="Community rules"
      modalSize="md"
      setIsOpenModal={setIsOpen}
      primaryButtonLabel="Close"
      onClick={onClick}
      isSmallerUpperGap>
      <p className={cx('community-rules-modal')}>
        Cognizant Technology Solutions Corporation and its affiliated companies (“Cognizant” “we” or
        “us”) are firmly committed to protecting your privacy. You should understand what we do with
        data relating to you (“personal information”) which we collect when you visit this website
        (cognizant.com), our country-specific sites or any other websites to which this Cognizant
        Website Privacy Notice (“Privacy Notice”) applies (collectively, the “Sites”). As a global
        company, Cognizant has a number of legal entities in different jurisdictions which are
        responsible for the personal information which they collect independently and which may be
        processed on their behalf by Cognizant Technology Solutions U.S. Corporation and its
        affiliates. The data controller for personal information collected from a visitor to the
        Sites is Cognizant Technology Solutions U.S. Corporation, 211 Quality Circle, College
        Station, Texas, United States of America or the affiliate specified on the Site that
        references this Privacy Notice. <br /> <br /> We may supplement this Privacy Notice to
        address specific situations. All supplemental notices should be read together with this
        Privacy Notice.
      </p>
    </Modal>
  );
}
