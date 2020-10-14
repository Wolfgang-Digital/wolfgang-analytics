import React, { useState } from 'react';
import Select from 'react-select';
import {
  Tabs,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Heading
} from '@chakra-ui/core';
import { useParams } from 'react-router-dom';

import { SelectOption } from 'types';
import ClientForm from './ClientForm';
import Card from 'components/Card';

const organisationTypes = ['Organization', 'Local Business', 'Hotel', 'Travel Agency']
  .sort()
  .map(type => ({ label: type, value: type }));

const CreateClientPage: React.FC = () => {
  const { clientId } = useParams();
  const [tab, setTab] = useState(!!clientId ? 1 : 0);
  const [type, setType] = useState(organisationTypes[0]);

  return (
    <Tabs index={tab}>
      <TabPanels outline={0}>
        <TabPanel height="calc(100vh - 300px)" display="flex" flexDirection="column" outline={0}>
          <Card maxWidth="720px" width="100%" margin="auto">
            <Heading size="md" mb={4}>
              Create Client
            </Heading>
            <FormControl isRequired>
              <FormLabel>Type</FormLabel>
              <Select
                value={type}
                options={organisationTypes}
                onChange={selected => setType(selected as SelectOption)}
              />
              <FormHelperText>Select an organisation type for this client</FormHelperText>
            </FormControl>
            <Button isFullWidth variantColor="teal" mt={4} onClick={() => setTab(1)}>
              Next
            </Button>
          </Card>
        </TabPanel>
        <TabPanel maxWidth="1080px" width="100%" margin="auto" outline={0} pb={4}>
          <ClientForm type={type.value} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CreateClientPage;
