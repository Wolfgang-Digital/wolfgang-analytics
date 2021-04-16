import React from 'react';
import { Link, PseudoBox, Text } from '@chakra-ui/core';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';

interface Props {
  label: string;
  link: string;
  icon: JSX.Element;
  isOpen?: boolean;
}

const SidebarLink: React.FC<Props> = ({ label, link, icon: Icon, isOpen }) => {
  const match = useRouteMatch(link);

  const transitions = useTransition(isOpen, null, {
    from: {
      position: 'absolute',
      opacity: 0,
      display: 'grid',
      gridTemplateColumns: '18px 1fr',
      gridColumnGap: '12px',
      alignItems: 'center',
      height: '21px',
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200
    }
  });

  return (
    <PseudoBox
      py={2}
      _hover={{ transform: 'translateX(4px)' }}
      transition="200ms ease-out"
      cursor="pointer"
      width="100%"
      px={4}
    >
      <Link
        // @ts-ignore
        as={RouterLink}
        to={link}
        display="flex"
        alignItems="center"
        _focus={{ boxShadow: 0 }}
        _hover={{ textDecoration: 0 }}
        color={!!match ? 'teal.400' : 'gray.500'}
        width="100%"
        fontWeight={400}
        height="21px"
      >
        {transitions.map(({ item, key, props }) =>
          item ? (
            <animated.div key={key} style={props}>
              {Icon}
              <Text fontSize="0.9em">{label}</Text>
            </animated.div>
          ) : (
            <animated.div key={key} style={props}>
              {Icon}
            </animated.div>
          )
        )}
      </Link>
    </PseudoBox>
  );
};

export default SidebarLink;
