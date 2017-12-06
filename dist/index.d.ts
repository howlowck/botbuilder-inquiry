import Inquiry, { InquiryState, InquiryInterface, Validator as InquiryValidator, Validator } from './inquiry/Inquiry';
import InquiryReducer from './inquiry/inquiryReducer';
import { Action as InquiryAction } from './inquiry/InquiryActions';
import InquiryReduxMiddleware from './InquiryReduxMiddleware';
import InquiryStateMiddleware from './InquiryStateMiddleware';
declare const makeValidator: (v: (s: string) => boolean, r: string) => Validator;
export { Inquiry, InquiryValidator, InquiryState, InquiryReducer, InquiryAction, InquiryReduxMiddleware, InquiryStateMiddleware, InquiryInterface, makeValidator };
