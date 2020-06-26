import React from 'react';
import { SimpleGrid, Heading } from '@chakra-ui/core';

import ToolIntroPanel from 'components/ToolIntroPanel';

const HomePage: React.FC = () => {
  return (
    <>
      <Heading mb={4} fontWeight={400} color="gray.700" transform="translateY(-6px)">
        Tools
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        <ToolIntroPanel
          title="Metric Forecasting"
          link="/forecast"
          image="analytics_charts.png"
          description="Uses Facebook Prophet to predict future trends based on previously observed data."
          learnMoreLink="https://facebook.github.io/prophet/"
          colour="blue"
          bgPos="center top 32px"
        />
        <ToolIntroPanel
          title="Schema Generator"
          link="/structured-data"
          image="code_illustration.png"
          description="Form interface for generating structured data for Google search."
          learnMoreLink="https://developers.google.com/search/docs/guides/intro-structured-data"
          colour="orange"
          bgPos="center top -10px"
        />
      </SimpleGrid>
    </>
  );
};

export default HomePage;
