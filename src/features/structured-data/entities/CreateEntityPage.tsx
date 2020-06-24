import React, { useState } from 'react';
import Select from 'react-select';
import { Tabs, TabPanels, TabPanel, FormControl, FormLabel, FormHelperText, Button } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SelectOption } from 'types';
import Card from 'components/Card';
import MainEntityForm from './MainEntityForm';
import { getMainEntityOnPage } from './slice';

const entityTypes = ['FAQ'].sort().map(type => ({ label: type, value: type }));

const CreateEntityPage: React.FC = () => {
  const { pageId } = useParams();

  const mainEntity = useSelector(getMainEntityOnPage(pageId));

  const [tab, setTab] = useState(!!mainEntity ? 1 : 0);
  const [type, setType] = useState(entityTypes[0]);

  return (
    <Tabs index={tab}>
      <TabPanels outline={0}>
        <TabPanel height="calc(100vh - 300px)" display="flex" flexDirection="column" outline={0}>
          <Card maxWidth="720px" width="100%" margin="auto">
            <FormControl isRequired>
              <FormLabel>Type</FormLabel>
              <Select value={type} options={entityTypes} onChange={selected => setType(selected as SelectOption)} />
              <FormHelperText>Select the type of main entity for this web page</FormHelperText>
            </FormControl>
            <Button isFullWidth variantColor="teal" mt={8} onClick={() => setTab(1)}>
              Next
            </Button>
          </Card>
        </TabPanel>
        <TabPanel maxWidth="1080px" width="100%" margin="auto" outline={0}>
          <MainEntityForm type={type.value} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CreateEntityPage;
