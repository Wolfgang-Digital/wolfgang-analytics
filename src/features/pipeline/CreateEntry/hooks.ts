import { useState, useEffect } from 'react';
import * as yup from 'yup';

const enquirySchema = yup.object().shape({
  company_name: yup.string().required(),
  is_new: yup.boolean().required(),
  country: yup.string().required(),
  channels: yup.array().of(yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required()
  })).min(1),
  source: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required()
  }).required(),
  source_comment: yup.string()
});

const proposalSchema = yup.object().shape({
  proposal_leads: yup.array().of(yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required()
  })).min(1),
  contact_email: yup.string().email(),
  details: yup.string(),
  success_probability: yup.number()
});

export const useFormValidation = (data: Record<string, any>, step: number, channels?: { label: string, value: string }[]) => {
  const [validation, setValidtion] = useState<boolean>();

  useEffect(() => {
    const updateValidation = async () => {
      switch (step) {
        case 0:
          const enquiry = await enquirySchema.isValid(data);
          setValidtion(enquiry);
          break;

        case 1:
          const proposal = await proposalSchema.isValid(data);
          setValidtion(proposal);
          break;

        case 2:
          if (channels) {
            let isValid = true;
            for (const channel of channels) {
              if (!data.channel_data?.[channel.value]?.duration) {
                isValid = false;
                break;
              }
            }
            setValidtion(isValid);
          } else {
            setValidtion(false);
          }
          break;

        default:
          return false;
      }
    }
    updateValidation();
  }, [data, step, channels]);

  return validation;
};