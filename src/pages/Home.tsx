import React from 'react';
import { SimpleGrid, Heading } from '@chakra-ui/core';

import ToolIntroPanel from 'components/ToolIntroPanel';

const HomePage: React.FC = () => {

  return (
    <>
      <Heading marginBottom={6}>Tools</Heading>
      <SimpleGrid columns={[1, 2, 2, 3]} spacing={10}>
        <ToolIntroPanel
          title="Metric Forecasting"
          link="/forecast"
          image="/static/forecast_icon.svg"
          description="Uses Facebook Prophet to predict future trends based on previously observed data."
          learnMoreLink="https://facebook.github.io/prophet/"
          colour="blue.500"
        />
      </SimpleGrid>
    </>
  );
};

export default HomePage;
