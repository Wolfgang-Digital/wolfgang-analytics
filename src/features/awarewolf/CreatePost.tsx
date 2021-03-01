import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  FormHelperText,
  Link,
  Heading
} from '@chakra-ui/core';
import { useDispatch } from 'react-redux';

import { useLinkHandler } from 'hooks/useLinkHandler';
import { setIsLoading, Post } from './slice';
import TagList from './TagList';
import { awsPost } from 'utils/api';

const md = new MarkdownIt();

const CreatePost: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useLinkHandler();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState('');

  const handleEditorChange = ({ text }: any) => {
    setText(text);
  };

  const handleAddTag = (e: any) => {
    if (e.key === 'Enter' && currentTag.length > 0) {
      if (tags.length > 0) {
        setTags((prev) => `${prev},${currentTag}`);
      } else {
        setTags(currentTag);
      }
      setCurrentTag('');
    }
  };

  const handleDeleteTag = (tag: string) => {
    const re = new RegExp(`${tag},?`, 'i');
    setTags((prev) => prev.replace(re, ''));
    setTags((prev) => prev.replace(/,$/, ''));
  };

  const handleSubmit = async () => {
    dispatch(setIsLoading(true));
    const res = await awsPost<Post>(`/awarewolf/posts`, { title, text, tags });
    dispatch(setIsLoading(false));
    if (res.success) {
      navigate(`/awarewolf/posts/p/${res.data.post_id}`);
    }
  };

  return (
    <Box pb={12}>
      <Heading size="lg" as="h1" marginBottom="1rem">
        Create Post
      </Heading>
      <FormControl isRequired my={6}>
        <FormLabel htmlFor="title">Post Title</FormLabel>
        <Input name="title" value={title} onChange={(e: any) => setTitle(e.target.value)} />
      </FormControl>
      <MdEditor
        style={{ height: '300px' }}
        renderHTML={(text) => md.render(text)}
        onChange={handleEditorChange}
      />
      <FormHelperText>
        Markdown text editor - see{' '}
        <Link href="https://spec.commonmark.org/current/" isExternal>
          https://spec.commonmark.org/current/
        </Link>{' '}
        for specs
      </FormHelperText>
      <Box mt={6}>
        <TagList tags={tags} randomise={false} handleDelete={handleDeleteTag} />
        <FormControl mt={1} onKeyPress={(e) => handleAddTag(e)}>
          <Input
            name="tags"
            value={currentTag}
            onChange={(e: any) => setCurrentTag(e.target.value)}
            placeholder="Enter tag name"
          />
          <FormHelperText>Create a tag and press Enter to add it to the list</FormHelperText>
        </FormControl>
      </Box>
      <Flex justifyContent="flex-end">
        <Button mt={6} width="100px" variantColor="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default CreatePost;
