import React, { useState, useEffect } from 'react';
import { Button, Collapse } from '@chakra-ui/core';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

import { useCommentCreator } from './hooks';

const md = new MarkdownIt();

interface Props {
  postId: number;
  parentId?: number;
  isOpen: boolean;
  height?: string;
  sortKey: number[];
  toggleOpen?: (e?: any) => void;
}

const CreateComment: React.FC<Props> = ({
  isOpen,
  height = '200px',
  postId,
  parentId = null,
  sortKey,
  toggleOpen,
}) => {
  const [body, setBody] = useState('');
  const { isLoading, submitComment } = useCommentCreator(postId, parentId, sortKey);

  const handleEditorChange = ({ text }: any) => {
    setBody(text);
  };

  let timeout: any;

  const handleSubmit = () => {
    submitComment(body);
    timeout = setTimeout(() => {
      toggleOpen?.();
      setBody('');
    }, 100);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, [timeout]);

  return (
    <Collapse isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
      <MdEditor
        style={{ height }}
        renderHTML={(text) => md.render(text)}
        onChange={handleEditorChange}
      />
      <Button size="xs" variantColor="teal" my={2} isLoading={isLoading} onClick={handleSubmit}>
        Submit
      </Button>
    </Collapse>
  );
};

export default CreateComment;
