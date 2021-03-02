import React from 'react';
import { SimpleGrid, Heading, Text } from '@chakra-ui/core';

import FeatureCard from 'components/FeatureCard';

const HomePage: React.FC = () => {
  return (
    <>
      <Heading mb={4} mt={2} size="lg" transform="translateY(-6px)">
        Wolfgang Analytics
        <Text as="span" fontWeight={400}>
          - Features
        </Text>
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        <FeatureCard
          title="Monthly Reviews"
          link="/user/monthly-reviews"
          linkText="Show My Reviews"
          image="reviews_banner.png"
          description="Your monthly review questionnaire."
          colour="purple"
          bgPos="center top"
          bgSize="100%"
        />
        <FeatureCard
          title="Metric Forecasting"
          link="/forecast"
          linkText="Use the Tool"
          image="analytics_charts.png"
          description="Predict future trends using client data from Google Analytics."
          learnMoreLink="https://facebook.github.io/prophet/"
          colour="teal"
          bgPos="center top 32px"
        />
        <FeatureCard
          title="Schema Generator"
          link="/structured-data"
          linkText="Use the Tool"
          image="code_illustration.png"
          description="Form interface for generating structured data for Google search."
          learnMoreLink="https://developers.google.com/search/docs/guides/intro-structured-data"
          colour="orange"
          bgPos="center top -10px"
        />
        <FeatureCard
          title="Awarewolf"
          link="/awarewolf"
          linkText="Show Posts"
          image="awarewolf_banner.png"
          description="A form for company suggestions, ideas and banter."
          colour="blue"
          bgPos="center top"
          bgSize="100%"
        />
      </SimpleGrid>
    </>
  );
};

export default HomePage;
