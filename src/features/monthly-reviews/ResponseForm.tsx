import React, { useEffect, useMemo } from 'react';
import { Box, Heading, Skeleton, useToast } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { Form, Schema } from 'react-hook-form-generator';

import { formStyles } from 'utils/formStyles';
import { fetchResponses, getResponse, updateResponse } from './slice';
import Card from 'components/Card';
import LabelledValue from 'components/LabelledValue';

const ResponseForm: React.FC = () => {
  const { reviewId, responseId, role } = useParams();

  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResponses(reviewId));
  }, [reviewId, dispatch]);

  const { data, error, isLoading } = useSelector(getResponse);

  const response = data?.responses?.find((r) => r.response_id.toString() === responseId);

  const defaultValues = !!response
    ? role === 'manager'
      ? response.manager_form_data
      : response.employee_form_data
    : undefined;

  const schema = useMemo(() => {
    if (!data) return {};

    if (role === 'manager') {
      return {
        pillars: {
          type: 'object',
          label: 'Pillars',
          isCollapsable: true,
          styles: {
            label: {
              fontSize: '1.2em',
              fontWeight: 700,
              color: 'teal.500',
              p: 0,
            },
          },
          properties: data?.form_data.pillars.reduce((result: Schema, current) => {
            result[current.value.name] = {
              type: 'object',
              label: current.value.name,
              styles: {
                objectContainer: {
                  isInline: true,
                },
                propertyContainer: {
                  width: '100%',
                },
                label: {
                  color: 'purple.500'
                }
              },
              properties: {
                score: {
                  type: 'number',
                  label: 'Score',
                  isRequired: true,
                },
                note: {
                  type: 'text',
                  label: 'Note',
                },
              },
            };
            return result;
          }, {}),
        },
        metrics: {
          type: 'object',
          label: 'Commercial Metrics',
          isCollapsable: true,
          styles: {
            label: {
              fontSize: '1.2em',
              fontWeight: 700,
              color: 'teal.500',
              p: 0,
            },
          },
          properties: data?.form_data.metrics.reduce((result: Schema, current) => {
            result[current.value] = {
              type: 'object',
              label: current.value,
              styles: {
                objectContainer: {
                  isInline: true,
                },
                propertyContainer: {
                  width: '100%',
                },
                label: {
                  color: 'purple.500'
                }
              },
              properties: {
                value: {
                  type: 'number',
                  label: 'Value',
                  isRequired: true,
                },
                note: {
                  type: 'text',
                  label: 'Note',
                },
              },
            };
            return result;
          }, {}),
        },
      };
    } else {
      return (
        data?.form_data.questions.reduce((result, current) => {
          result[current.value.section] = {
            type: 'object',
            label: current.value.section,
            isCollapsable: true,
            properties: current.value.questions.reduce((_result, _current) => {
              _result[_current.value] = {
                type: 'textArea',
                label: _current.value,
                styles: {
                  label: {
                    fontSize: '1.2em',
                    fontWeight: 700,
                    color: 'teal.500',
                    p: 0,
                  },
                },
              };
              return _result;
            }, {} as Schema),
          };
          return result;
        }, {} as Schema) || ({} as Schema)
      );
    }
  }, [role, data]);

  const handleSubmit = async (formData: any) => {
    await dispatch(
      updateResponse({
        id: responseId,
        role: role.toUpperCase(),
        formData,
      })
    );
    if (!error) {
      toast({
        variant: 'left-accent',
        status: 'success',
        description: 'Response updated',
        position: 'bottom-left',
        isClosable: true,
      });
    } else {
      toast({
        variant: 'left-accent',
        status: 'error',
        description: error,
        position: 'bottom-left',
        isClosable: true,
      });
    }
  };

  return (
    <Box pb={12}>
      <Skeleton isLoaded={!isLoading}>
        <Heading size="lg" as="h1" marginBottom="1rem">
          {response && format(new Date(response.review_date), 'MMMM yyyy')}
        </Heading>
      </Skeleton>
      <Card display="grid" gridTemplateColumns="1fr auto" mb={6}>
        <Box>
          <LabelledValue label="Employee" value={data?.employee_name || ''} />
          <LabelledValue label="Manager" value={data?.manager_name || ''} />
          <LabelledValue label="Department" value={data?.department || ''} />
          {response && (
            <LabelledValue
              label="Review Date"
              value={format(new Date(response.review_date), 'MMMM yyyy')}
            />
          )}
        </Box>
      </Card>
      {!!data && (
        <Form
          schema={schema as Schema}
          styles={formStyles}
          handleSubmit={handleSubmit}
          formOptions={{ defaultValues }}
        />
      )}
    </Box>
  );
};

export default ResponseForm;
