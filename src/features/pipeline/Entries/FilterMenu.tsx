import React, { useState, useEffect } from 'react';
import {
  useDisclosure,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Text,
} from '@chakra-ui/core';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { useClickOutside } from 'hooks/useClickOutside';
import { useCurrentUser } from 'hooks/users';
import { getControls } from './FilterControls';
import { useDispatch } from 'react-redux';
import { setFilters } from '../slice';

const enquiryFilters = [
  'Date',
  'Client Type',
  'Duration',
  'Channels',
  'Source',
  'Proposal Leads',
  'Status',
  'Outcome',
  'Updated',
  'Date Closed',
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

export const PresetFilterMenu: React.FC = () => {
  const dispatch = useDispatch();
  const user = useCurrentUser();

  const setPreset = (preset: string) => {
    switch (preset) {
      case 'my_clients':
        if (user) {
          dispatch(
            setFilters([
              {
                column: 'Proposal Leads',
                operator: 'contains',
                value: user.user_id,
                displayValue: user.username,
              },
            ])
          );
        }
        break;

      case 'pending':
        dispatch(
          setFilters([
            {
              column: 'Status',
              operator: 'is',
              value: 'Open',
            },
          ])
        );
        break;

      case 'won':
        dispatch(
          setFilters([
            {
              column: 'Status',
              operator: 'is',
              value: 'Closed',
            },
            {
              column: 'Outcome',
              operator: 'is',
              value: 'Won',
            },
          ])
        );
        break;

      case 'lost':
        dispatch(
          setFilters([
            {
              column: 'Status',
              operator: 'is',
              value: 'Closed',
            },
            {
              column: 'Outcome',
              operator: 'is',
              value: 'Lost',
            },
          ])
        );
        break;

      default:
        break;
    }
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        //@ts-ignore
        icon="star"
        size="sm"
        mr={2}
        mb={2}
      />
      <MenuList fontSize="0.85em" placement="bottom-start" id="menu">
        <MenuGroup title="Filter Presets">
          <MenuItem onClick={() => setPreset('my_clients')}>My Clients</MenuItem>
          <MenuItem onClick={() => setPreset('pending')}>Pending</MenuItem>
          <MenuItem onClick={() => setPreset('won')}>Won</MenuItem>
          <MenuItem onClick={() => setPreset('lost')}>Lost</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
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
          <MenuGroup title="Filter Column">
            {enquiryFilters.map((filter) => (
              <FilterMenuItem
                key={filter}
                label={filter}
                current={current}
                setCurrent={setCurrent}
                close={onClose}
              />
            ))}
          </MenuGroup>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FilterMenu;
