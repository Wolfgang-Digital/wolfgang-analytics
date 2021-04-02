import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { awsPost, awsGet } from 'utils/api';
import { RootState } from 'store';

export interface Post {
  post_id: number
  username: string
  title: string
  body?: string
  created_at: string
  vote_score: number
  num_comments?: number
  user_vote?: number
  tags?: string
}

export interface Comment {
  comment_id: number
  username: string
  body: string
  created_at: string
  vote_score: number
  num_comments?: number
  user_vote?: number
  depth: number
  sort_key: number[]
}

interface PostVoteResponse {
  post_id: number
  user_id: string
  vote_value: number
}

interface CommentVoteResponse extends Omit<PostVoteResponse, 'post_id'> {
  comment_id: number
}

export interface AwarewolfState {
  isLoading: boolean
  voteIsLoading: boolean
  posts: Post[]
  error?: string
  activePost?: Post
  comments: Comment[]
}

export const initialState: AwarewolfState = {
  isLoading: true,
  voteIsLoading: false,
  posts: [],
  comments: []
}

export const fetchPosts = createAsyncThunk<Post[]>(
  'awarewolf/posts/get',
  async (params, { rejectWithValue }) => {
    const res = await awsGet<Post[]>('/awarewolf/posts');
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const fetchPost = createAsyncThunk<Post, number | string>(
  'awarewolf/posts/getWithId',
  async (id, { rejectWithValue }) => {
    const res = await awsGet<Post>(`/awarewolf/posts/p/${id}`);
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const createPost = createAsyncThunk<any, { title: string, text: string, tags: string }>(
  'awarewolf/posts/create',
  async (params, { rejectWithValue }) => {
    const res = await awsPost(`/awarewolf/posts`, params);
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const voteOnPost = createAsyncThunk<PostVoteResponse, { id: number, value: number }>(
  'awarewolf/posts/vote',
  async ({ id, value }, { rejectWithValue }) => {
    const res = await awsPost<PostVoteResponse>(`/awarewolf/posts/p/${id}/vote`, { value });
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const voteOnComment = createAsyncThunk<PostVoteResponse, { id: number, value: number }>(
  'awarewolf/comments/vote',
  async ({ id, value }, { rejectWithValue }) => {
    const res = await awsPost<PostVoteResponse>(`/awarewolf/comments/c/${id}/vote`, { value });
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const fetchComments = createAsyncThunk<Comment[], number>(
  'awarewolf/comments/get',
  async (id, { rejectWithValue }) => {
    const res = await awsGet<Comment[]>(`/awarewolf/posts/p/${id}/comments`);
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

interface CreateCommentProps {
  id: number
  parentId: number | null
  body: string
  username: string
  sortKey: number[]
}

export const createComment = createAsyncThunk<Comment, CreateCommentProps>(
  'awarewolf/comments/create',
  async ({ id, ...rest }, { rejectWithValue }) => {
    const res = await awsPost<Comment>(`/awarewolf/posts/p/${id}/comment`, { ...rest });
    if (res.success) {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
)

const slice = createSlice({
  name: 'awarewolf',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending.toString()]: state => {
      state.isLoading = true;
      state.error = undefined;
    },

    [fetchPosts.fulfilled.toString()]: (state, { payload }: PayloadAction<Post[]>) => {
      state.isLoading = false;
      state.error = undefined;
      state.posts = payload;
    },

    [fetchPosts.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },

    [fetchPost.pending.toString()]: state => {
      state.isLoading = true;
      state.activePost = undefined;
      state.error = undefined;
    },

    [fetchPost.fulfilled.toString()]: (state, { payload }: PayloadAction<Post>) => {
      state.isLoading = false;
      state.error = undefined;
      state.activePost = payload;
    },

    [fetchPost.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },

    [voteOnPost.pending.toString()]: state => {
      state.voteIsLoading = true;
      state.error = undefined;
    },

    [voteOnPost.fulfilled.toString()]: (state, { payload }: PayloadAction<PostVoteResponse>) => {
      state.voteIsLoading = false;
      state.error = undefined;

      const postIndex = state.posts.findIndex(p => p.post_id.toString() === payload.post_id.toString());

      if (postIndex > -1) {
        if (state.posts[postIndex].vote_score) {
          state.posts[postIndex].vote_score -= state.posts[postIndex].user_vote || 0;
          state.posts[postIndex].vote_score += payload.vote_value;
        }
        else {
          state.posts[postIndex].vote_score = payload.vote_value;
        }
        state.posts[postIndex].user_vote = payload.vote_value;
      }

      if (state.activePost) {
        if (state.activePost.vote_score) {
          state.activePost.vote_score -= state.activePost.user_vote || 0;
          state.activePost.vote_score += payload.vote_value;
        }
        else {
          state.activePost.vote_score = payload.vote_value;
        }
        state.activePost.user_vote = payload.vote_value;
      }
    },

    [voteOnPost.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.voteIsLoading = false;
      state.error = payload;
    },

    [fetchComments.pending.toString()]: state => {
      state.isLoading = true;
      state.comments = [];
      state.error = undefined;
    },

    [fetchComments.fulfilled.toString()]: (state, { payload }: PayloadAction<Comment[]>) => {
      state.isLoading = false;
      state.error = undefined;
      state.comments = payload;
    },

    [fetchComments.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },

    [createComment.pending.toString()]: state => {
      state.error = undefined;
    },

    [createComment.fulfilled.toString()]: (state, { payload }: PayloadAction<Comment>) => {
      state.error = undefined;
      state.comments.push(payload);
    },

    [createComment.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },

    [voteOnComment.pending.toString()]: state => {
      state.voteIsLoading = true;
      state.error = undefined;
    },

    [voteOnComment.fulfilled.toString()]: (state, { payload }: PayloadAction<CommentVoteResponse>) => {
      state.voteIsLoading = false;
      state.error = undefined;
      const i = state.comments.findIndex(c => c.comment_id.toString() === payload.comment_id.toString());

      if (i > -1) {
        if (state.comments[i].vote_score) {
          state.comments[i].vote_score -= state.comments[i].user_vote || 0;
          state.comments[i].vote_score += payload.vote_value;
        }
        else {
          state.comments[i].vote_score = payload.vote_value;
        }
        state.comments[i].user_vote = payload.vote_value;
      }
    },

    [voteOnComment.rejected.toString()]: (state, { payload }: PayloadAction<string>) => {
      state.voteIsLoading = false;
      state.error = payload;
    },
  }
});

const getAwarewolfState = (state: RootState) => state.awarewolf;

export const getPosts = createSelector(
  getAwarewolfState,
  state => state.posts
);

export const getActivePost = createSelector(
  getAwarewolfState,
  state => state.activePost
);

export const getIsLoading = createSelector(
  getAwarewolfState,
  state => state.isLoading
);

export const getLoadingState = createSelector(
  getAwarewolfState,
  ({ isLoading, error }) => ({ isLoading, error })
);

export const getVoteIsLoading = createSelector(
  getAwarewolfState,
  state => state.voteIsLoading
);

export const getComments = createSelector(
  getAwarewolfState,
  state => {
    return {
      parentPostId: state.activePost?.post_id,
      comments: state.comments
    };
  }
);

export const { setIsLoading, setError } = slice.actions;
export default slice.reducer;