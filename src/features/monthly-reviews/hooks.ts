import { useMemo, useState } from 'react';
import { subMonths, addMonths, isSameMonth, lastDayOfMonth, format } from 'date-fns';
import { useToast } from '@chakra-ui/core';
import { ReviewResponse, FilledReview, DepartmentReport } from './types';
import { awsGet } from 'utils/api';
import { useMonths } from 'hooks/useMonths';
import { departmentOptions } from 'utils/constants';

// Gets the IDs of the previous months and next months responses, if available
export const useRelatedResponseIds = (id: string, review?: ReviewResponse) => {
  if (!review) return {};

  const response = review.responses.find((r) => r.response_id.toString() === id);

  if (!response) return {};

  const date = new Date(response.review_date);
  const previousDate = subMonths(date, 1);
  const nextDate = addMonths(date, 1);
  const previousResponse = review.responses.find((r) => isSameMonth(previousDate, new Date(r.review_date)));
  const nextResponse = review.responses.find((r) => isSameMonth(nextDate, new Date(r.review_date)));

  return {
    prev: previousResponse?.response_id,
    next: nextResponse?.response_id
  };
};

export const useResponse = (id: string, review?: ReviewResponse) => {
  return useMemo(() => {
    if (!review) return null;

    const response = review.responses.find((r) => r.response_id.toString() === id);

    if (!response) return null;

    const date = new Date(response.review_date);
    const previousDate = subMonths(date, 1);
    const previousResponse = review.responses.find((r) => isSameMonth(previousDate, new Date(r.review_date)));

    return { current: response, previous: previousResponse };
  }, [id, review]);
};

export const useResponseValues = (responseId: string, review?: ReviewResponse): Partial<FilledReview> => {
  const response = useResponse(responseId, review);


  return useMemo(() => {
    return {
      pillars: review?.form_data.pillars?.map(pillar => {
        const data = response?.current.manager_form_data?.pillars?.[pillar.value.name];
        const previousData = response?.previous?.manager_form_data?.pillars?.[pillar.value.name];
        const delta = (!!data && !!previousData) ? data.score - previousData.score : undefined;

        return {
          ...pillar.value,
          ...data,
          delta
        };
      }) || [],

      metrics: review?.form_data.metrics?.map(metric => {
        const data = response?.current.manager_form_data?.metrics?.[metric.value];
        const previousData = response?.previous?.manager_form_data?.metrics?.[metric.value];
        const delta = (!!data && !!previousData) ? data.value - previousData.value : undefined;

        return {
          name: metric.value,
          ...data,
          delta
        };
      }) || [],

      questions: review?.form_data.questions?.reduce((result, current) => {
        current.value.questions.forEach(question => {
          const answer = response?.current.employee_form_data?.[current.value.section]?.[question.value];

          result.push({
            section: current.value.section,
            value: question.value,
            answer
          })
        });
        return result;
      }, [] as FilledReview['questions'])
    };
  }, [review, response]) || [];
};

export const useDepartmentReport = () => {
  const toast = useToast();
  const months = useMonths(12);
  const [month, setMonth] = useState(months[0]);
  const [dept, setDept] = useState(departmentOptions[0]);
  const [data, setData] = useState<DepartmentReport>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const getReport = async () => {
    setIsLoading(true);
    setData(undefined);
    setError(undefined);

    const start = format(month.value, 'yyyy-MM-01');
    const end = format(lastDayOfMonth(month.value), 'yyyy-MM-dd');

    try {
      const res = await awsGet<DepartmentReport>(`/reviews/reports/${dept.label}`, { start, end });
      if (res.success) {
        setData(res.data);
      } else {
        setError(res.error);
        toast({
          variant: 'left-accent',
          status: 'error',
          description: res.error,
          position: 'bottom-left',
          isClosable: true,
        });
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.toString());
    }
  };

  return {
    data,
    isLoading,
    error,
    month,
    setMonth,
    dept,
    setDept,
    getReport,
    months,
    departments: departmentOptions
  };
}