import React, { useState, useEffect } from 'react';
import {
  useDisclosure,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/core';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { useClickOutside } from 'hooks/useClickOutside';
import { getControls } from './FilterControls';

const enquiryFilters = [
  'Date',
  'Type',
  'Duration',
  'Channels',
  'Source',
  'Status',
  'Outcome',
  'Updated'
];
// const proposalFilters = ['Date Contacted', 'Proposal Date', 'Meeting Date'];

interface MenuItemProps {
  label: string;
  current?: string;
  setCurrent: (label?: string) => void;
  close: () => void;
}

const FilterMenuItem: React.FC<MenuItemProps> = ({ label, current, setCurrent, close }) => {
  const onClose = () => {
    setCurrent(undefined);
    close();
  };

  const FilterControl = getControls(label);

  return (
    <>
      <MenuItem as="div" onClick={() => setCurrent(current === label ? undefined : label)}>
        <Text w="100%" fontFamily="inherit" color={current === label ? 'purple.600' : undefined}>
          {label}
        </Text>
        {FilterControl && (
          <FilterControl isOpen={current === label} column={label} close={onClose} />
        )}
      </MenuItem>
    </>
  );
};

const FilterMenu: React.FC = () => {
  const [current, setCurrent] = useState<string>();
  const { onToggle, isOpen, onClose } = useDisclosure();

  const handleClick = (e: MouseEvent) => {
    // @ts-ignore
    if (!e.path.find((x) => x.id === 'menu')) {
      setCurrent(undefined);
      onClose();
    }
  };

  const ref = useClickOutside(handleClick, isOpen);

  useEffect(() => {
    if (!current) onClose();
  }, [current, onClose]);

  return (
    <Menu closeOnSelect={false} isOpen={isOpen}>
      <MenuButton
        as={IconButton}
        //@ts-ignore
        icon="add"
        size="sm"
        onClick={onToggle}
        mr={2}
        mb={2}
      />
      <div ref={ref}>
        <MenuList fontSize="0.85em" placement="bottom-start" id="menu">
          {enquiryFilters.map((filter) => (
            <FilterMenuItem
              key={filter}
              label={filter}
              current={current}
              setCurrent={setCurrent}
              close={onClose}
            />
          ))}
        </MenuList>
      </div>
    </Menu>
  );
};

export default FilterMenu;
