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
} from '@chakra-ui/core';

import { initialFormState } from '../utils';

interface Props {
  state: typeof initialFormState['money'];
  updateForm: (args: { key: keyof typeof initialFormState['money']; value: any }) => void;
  boxProps?: BoxProps;
}

const Form: React.FC<Props> = ({ state, updateForm, boxProps }) => {
  const totals = useMemo(() => {
    return Object.entries(state).reduce(
      (result, [key, value]: [string, string | undefined]) => {
        if (key.includes('fmv') && !!value) result.monthOne += parseFloat(value);
        else if (key.includes('12mv') && !!value) result.monthTwelve += parseFloat(value);
        return result;
      },
      { monthOne: 0, monthTwelve: 0 }
    );
  }, [state]);

  return (
    <Box background="white" borderRadius={4} border="1px solid #E2E8F0" flexGrow={1} {...boxProps}>
      <Heading
        color="orange.500"
        size="md"
        borderBottom="1px solid #E2E8F0"
        textAlign="center"
        p={2}
      >
        The Money
      </Heading>
      <Box as="form" p={4}>
        <Grid templateColumns="1fr 1fr" columnGap={4}>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              PPC First-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="ppc_fmv"
                type="number"
                value={state.ppc_fmv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'ppc_fmv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              PPC 12-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="ppc_12mv"
                type="number"
                value={state.ppc_12mv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'ppc_12mv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
        </Grid>
        <Divider />
        <Grid templateColumns="1fr 1fr" columnGap={4}>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              SEO First-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="seo_fmv"
                type="number"
                value={state.seo_fmv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'seo_fmv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              SEO 12-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="seo_12mv"
                type="number"
                value={state.seo_12mv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'seo_12mv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
        </Grid>
        <Divider />
        <Grid templateColumns="1fr 1fr" columnGap={4}>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              Content First-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="content_fmv"
                type="number"
                value={state.content_fmv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'content_fmv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              Content 12-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="content_12mv"
                type="number"
                value={state.content_12mv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'content_12mv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
        </Grid>
        <Divider />
        <Grid templateColumns="1fr 1fr" columnGap={4}>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              Email First-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="email_fmv"
                type="number"
                value={state.email_fmv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'email_fmv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              Email 12-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="email_12mv"
                type="number"
                value={state.email_12mv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'email_12mv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
        </Grid>
        <Divider />
        <Grid templateColumns="1fr 1fr" columnGap={4}>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              Social First-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="social_fmv"
                type="number"
                value={state.social_fmv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'social_fmv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              Social 12-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="social_12mv"
                type="number"
                value={state.social_12mv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'social_12mv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
        </Grid>
        <Divider />
        <Grid templateColumns="1fr 1fr" columnGap={4}>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              Creative First-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="creative_fmv"
                type="number"
                value={state.creative_fmv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'creative_fmv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              Creative 12-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="creative_12mv"
                type="number"
                value={state.creative_12mv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'creative_12mv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
        </Grid>
        <Divider />
        <Grid templateColumns="1fr 1fr" columnGap={4}>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              CRO First-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="cro_fmv"
                type="number"
                value={state.cro_fmv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'cro_fmv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              CRO 12-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="cro_12mv"
                type="number"
                value={state.cro_12mv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'cro_12mv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
        </Grid>
        <Divider />
        <Grid templateColumns="1fr 1fr" columnGap={4}>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              Analytics First-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="analytics_fmv"
                type="number"
                value={state.analytics_fmv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'analytics_fmv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl pb={1}>
            <FormLabel color="gray.500" fontSize="sm">
              Analytics 12-Month Value
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="€" />
              <Input
                name="analytics_12mv"
                type="number"
                value={state.analytics_12mv}
                isFullWidth
                onChange={(e: any) => updateForm({ key: 'analytics_12mv', value: e.target.value })}
              />
            </InputGroup>
          </FormControl>
        </Grid>
        <Divider />
        <Grid templateColumns="1fr 1fr" columnGap={4}>
          <Stat>
            <StatLabel color="gray.500">Total First-Month Value</StatLabel>
            <StatNumber color="gray.600">€{totals.monthOne.toLocaleString('en-GB')}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel color="gray.500">Total 12-Month Value</StatLabel>
            <StatNumber color="gray.600">€{totals.monthTwelve.toLocaleString('en-GB')}</StatNumber>
          </Stat>
        </Grid>
      </Box>
    </Box>
  );
};

export default Form;
