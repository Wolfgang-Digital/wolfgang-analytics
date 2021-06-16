import React, { useMemo } from 'react';
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  Heading,
  Divider,
  InputGroup,
  InputLeftAddon,
  BoxProps,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  RadioGroup,
  Radio,
  Flex,
} from '@chakra-ui/core';

import { initialFormState } from '../utils';
import { ChannelData } from '../types';
import { clone } from 'lodash';

interface Props {
  state: typeof initialFormState['money'];
  updateForm: (args: { key: keyof typeof initialFormState['money']; value: any }) => void;
  boxProps?: BoxProps;
  channels?: string[] | { label: string; value: string }[];
  isEditPage?: boolean;
}

const Form: React.FC<Props> = ({ state, updateForm, boxProps, channels, isEditPage }) => {
  const totals = useMemo(() => {
    return Object.entries(state).reduce(
      (result, [key, value]: [string, string | undefined]) => {
        if (key.includes('12mv') && key !== 'total_12mv' && !!value) {
          result.monthTwelve += parseFloat(value);
        }
        return result;
      },
      { monthOne: 0, monthTwelve: 0 }
    );
  }, [state]);

  const handleChannelDataChange = (
    channel: string,
    key: 'duration' | 'outcome',
    value?: string | number
  ) => {
    let values: ChannelData = state.channel_data ? clone(state.channel_data) : {};
    if (values[channel]) {
      values[channel] = {
        ...values[channel],
        [key]: value,
      };
    } else {
      values[channel] = {
        name: channel,
        duration: 'Ongoing',
        [key]: value,
      };
    }
    updateForm({ key: 'channel_data', value: values });
  };

  return (
    <Box
      background="white"
      borderRadius={4}
      border="1px solid #E2E8F0"
      flexGrow={1}
      mb="auto"
      {...boxProps}
    >
      <Heading size="md" borderBottom="1px solid #E2E8F0" p={3}>
        The Money
      </Heading>
      <Box as="form" p={4}>
        {(channels as any)?.map((channel: string | { label: string; value: string }) => {
          const name = typeof channel === 'string' ? channel : channel.value;
          const key = `${name.toLowerCase()}_12mv`;
          const data = state.channel_data?.[name];
          return (
            <div key={name}>
              <Grid templateColumns="repeat(3, 1fr)" columnGap={4} alignItems="center">
                <FormControl pb={1} isRequired>
                  <FormLabel color="gray.500" fontSize="sm">
                    {name} 12M Value
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="€" />
                    <Input
                      name={key}
                      type="number"
                      // @ts-ignore
                      value={state[key]}
                      isFullWidth
                      onChange={(e: any) =>
                        // @ts-ignore
                        updateForm({ key, value: e.target.value })
                      }
                    />
                  </InputGroup>
                </FormControl>
                <Flex justify="center">
                  <FormControl isRequired>
                    <FormLabel color="gray.500" fontSize="sm">
                      Duration
                    </FormLabel>
                    <RadioGroup
                      isInline
                      spacing={6}
                      size="sm"
                      value={data?.duration}
                      onChange={(e, value) => handleChannelDataChange(name, 'duration', value)}
                    >
                      <Radio value="Once Off">Once Off</Radio>
                      <Radio value="Ongoing">Ongoing</Radio>
                    </RadioGroup>
                  </FormControl>
                </Flex>
                {isEditPage && (
                  <Flex justify="center">
                    <FormControl pb={1}>
                      <FormLabel color="gray.500" fontSize="sm">
                        Outcome
                      </FormLabel>
                      <RadioGroup
                        isInline
                        spacing={6}
                        size="sm"
                        value={data?.outcome}
                        onChange={(e, value) => handleChannelDataChange(name, 'outcome', value)}
                      >
                        <Radio value="Won" variantColor="teal">
                          Won
                        </Radio>
                        <Radio value="Lost" variantColor="red">
                          Lost
                        </Radio>
                      </RadioGroup>
                    </FormControl>
                  </Flex>
                )}
              </Grid>
              <Divider />
            </div>
          );
        })}
        <Flex>
          <Stat>
            <StatLabel color="gray.500">Total 12M Value</StatLabel>
            <StatNumber color="gray.600">€{totals.monthTwelve.toLocaleString('en-GB')}</StatNumber>
          </Stat>
        </Flex>
      </Box>
    </Box>
  );
};

export default Form;
