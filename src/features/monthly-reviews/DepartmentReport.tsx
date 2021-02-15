import React from 'react';
import {
  Box,
  Grid,
  Button,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  BoxProps,
  FormControl,
  FormLabel,
  Divider,
} from '@chakra-ui/core';
import Select from 'react-select';

import { useDepartmentReport } from './hooks';
import DRSection from './DRSection';

const cardProps: BoxProps = {
  background: 'white',
  border: '1px solid #E2E8F0',
  padding: 2,
  pb: 0,
  borderRadius: 4,
};

const DepartmentReport: React.FC = () => {
  const {
    data,
    getReport,
    months,
    month,
    setMonth,
    departments,
    dept,
    setDept,
    isLoading,
  } = useDepartmentReport();

  return (
    <Box pb={12}>
      <Heading size="lg" as="h1" marginBottom="2rem">
        Department Reports
      </Heading>
      <Grid
        templateColumns="250px 250px 1fr auto"
        columnGap={4}
        templateAreas="'date dept empty button'"
        mb={4}
      >
        <FormControl>
          <FormLabel fontSize="0.85rem" color="gray.700">
            Month
          </FormLabel>
          <Select value={month} options={months} onChange={setMonth as any} />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="0.85rem" color="gray.700">
            Department
          </FormLabel>
          <Select value={dept} options={departments} onChange={setDept as any} />
        </FormControl>
        <Button
          gridArea="button"
          mt="auto"
          onClick={getReport}
          isLoading={isLoading}
          fontWeight={400}
          variantColor="purple"
        >
          Get Report
        </Button>
      </Grid>
      <Divider mb={4} />
      {data ? (
        <>
          <Heading as="h2" size="sm" color="teal.600" mb={2}>
            Pillars
          </Heading>
          <Grid marginBottom="2rem" gridTemplateColumns="repeat(4, 1fr)" gridGap={4}>
            {Object.values(data.data.pillars).map((pillar) => (
              <Stat key={pillar.name} {...cardProps}>
                <StatLabel>{pillar.name}</StatLabel>
                <StatNumber>
                  {(pillar.total / pillar.count).toFixed(1).replace(/\.0$/, '')}
                </StatNumber>
                <StatHelpText>{`${pillar.total} total with ${pillar.count} response${
                  pillar.count > 1 ? 's' : ''
                }`}</StatHelpText>
              </Stat>
            ))}
          </Grid>
          <Heading as="h2" size="sm" color="teal.600" mb={2}>
            Commercial Metrics
          </Heading>
          <Grid
            marginBottom="2rem"
            gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
            gridGap={4}
          >
            {Object.values(data.data.metrics).map((metric) => (
              <Stat key={metric.name} {...cardProps}>
                <StatLabel>{metric.name}</StatLabel>
                <StatNumber>
                  {(metric.total / metric.count).toFixed(1).replace(/\.0$/, '')}
                </StatNumber>
                <StatHelpText>{`${metric.total} total with ${metric.count} response${
                  metric.count > 1 ? 's' : ''
                }`}</StatHelpText>
              </Stat>
            ))}
          </Grid>
          <Heading as="h2" size="sm" color="teal.600" mb={2}>
            Employee Feedback
          </Heading>
          {Object.values(data.data.sections).map((section) => (
            <DRSection key={section.sectionName} section={section} />
          ))}
        </>
      ) : null}
    </Box>
  );
};

export default DepartmentReport;
