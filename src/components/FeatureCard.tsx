import React from 'react';
import { Box, Heading, Text, Button, Link, Flex, PseudoBox } from '@chakra-ui/core';

import { useLinkHandler } from 'hooks/useLinkHandler';

interface Props {
  title: string;
  image: string;
  description: string;
  link: string;
  linkText: string
  learnMoreLink?: string;
  colour: string;
  bgPos: string;
  bgSize?: string
}

const FeatureCard: React.FC<Props> = ({
  title,
  image,
  description,
  link,
  learnMoreLink,
  colour,
  linkText,
  bgPos,
  bgSize = '80%'
}) => {
  const handleLinkClick = useLinkHandler();

  return (
    <Box
      backgroundImage={`url('/static/${image}')`}
      height="320px"
      width="100%"
      backgroundSize={bgSize}
      backgroundRepeat="no-repeat"
      backgroundPosition={bgPos}
      boxShadow="1px 2px 4px rgba(0, 0, 0, 0.2)"
      borderRadius={8}
    >
      <PseudoBox
        height="100%"
        display="flex"
        flexDirection="column"
        _before={{
          // @ts-ignore
          content: `""`,
          backgroundColor: `${colour}.500`,
          height: '100%',
          opacity: 0.5,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <Box
          backgroundColor={`${colour}.500`}
          mt="auto"
          borderBottomLeftRadius={8}
          borderBottomRightRadius={8}
          minHeight="130px"
          px={6}
          pt={4}
          pb={6}
          color="white"
          display="flex"
          flexDirection="column"
        >
          <Heading as="h3" fontSize="16px" letterSpacing={0.5} mb={2}>
            {title}
          </Heading>
          <Text fontSize="14px">{description}</Text>
          <Flex mt="auto" alignItems="center">
            {learnMoreLink && (
              <Link
                href={learnMoreLink}
                isExternal
                fontWeight={500}
                color="white"
                fontSize="14px"
                mr={4}
              >
                Learn More
              </Link>
            )}
            <Button
              variant="link"
              color="white"
              fontSize="14px"
              fontWeight={500}
              onClick={() => handleLinkClick(link)}
            >
              {linkText}
            </Button>
          </Flex>
        </Box>
      </PseudoBox>
    </Box>
  );
};

export default FeatureCard;
