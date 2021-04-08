import { EnquirySnippet, ProposalSnippet, MoneySnippet } from '../types';

export const getFormData = (input: EnquirySnippet | ProposalSnippet | MoneySnippet) => {
  return Object.entries(input).reduce((result: Record<string, any>, [key, value]) => {
    switch (key) {
      case 'channels':
        result.channels = value?.map((x: any) => x.value) || [];
        break;

      case 'source':
        result.source = value.value;
        break;

      default:
        if (key.match(/_(f|12)mv/)) {
          if (isNaN(parseFloat(value))) result[key] = null;
          else result[key] = parseFloat(value);
        } else {
          result[key] = value;
        }
        break;
    }
    return result;
  }, {});
};