import { useReducer } from 'react';

export interface RegisterState {
  email: string;
  userName: string;
  createPassword: string;
  repeatPassword: string;
  emailErrorMsg: string;
  userNameErrorMsg: string;
  createPasswordErrorMsg: string;
  repeatPasswordErrorMsg: string;
  communityRulesErrorMsg: string;
}

export type RegisterFieldActions = { type: keyof RegisterState; payload: string };

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

const registrationFormReducer = (
  state: RegisterState,
  action: RegisterFieldActions
): RegisterState => {
  switch (action.type) {
    case 'createPassword':
      return { ...state, [action.type]: action.payload, repeatPasswordErrorMsg: '' };
    default:
      return { ...state, [action.type]: action.payload };
  }
};

export const useRegisterData = () => {
  const [state, dispatch] = useReducer(registrationFormReducer, initialState);

  return { state, dispatch };
};
