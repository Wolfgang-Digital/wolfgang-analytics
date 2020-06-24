import React from 'react';
import { Grid, Image, Heading, Text, Button, Link as ExternalLink, Flex } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  image: string;
  description: string;
  link: string;
  learnMoreLink?: string;
  colour: string;
}

const ToolIntroPanel: React.FC<Props> = ({ title, image, description, link, learnMoreLink, colour }) => {
  return (
    <Grid
      templateColumns="3fr 1fr"
      templateRows="auto 1fr"
      backgroundColor={colour}
      color="white"
      padding={4}
      borderRadius={4}
      boxShadow="rgba(0, 0, 0, 0.2) 1px 2px 2px 0px"
    >
      <Heading as="h2" size="lg" marginTop="auto">
        {title}
      </Heading>
      <Image src={image} size="42px" marginLeft="auto" objectFit="cover" alt={title} />
      <>
        <Text marginTop={2} gridColumn="span 2">
          {description}
        </Text>
        <Flex marginTop={4} gridColumn="1 / span 2">
          <Link to={link} style={{ marginLeft: 'auto' }}>
            <Button variant="outline" _hover={{ color: colour, background: 'white' }} rightIcon="link" size="sm">
              Go to Tool
            </Button>
          </Link>
          {learnMoreLink && (
            <ExternalLink href={learnMoreLink} isExternal>
              <Button variant="outline" _hover={{ color: colour, background: 'white' }} rightIcon="external-link" size="sm" ml={2}>
                Learn More
              </Button>
            </ExternalLink>
          )}
        </Flex>
      </>
    </Grid>
  );
};

export default ToolIntroPanel;
