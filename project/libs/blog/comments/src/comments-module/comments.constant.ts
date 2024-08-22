export const DEFAULT_PAGE_COUNT = 1;

export const CommentLength = {
  MaxCount: 50,
  Min: 10,
  Max: 300
} as const;

export const CommentValidateMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidID: 'Invalid mongo id',
  MessageLesserMin: `The message is less than the minimum acceptable value ${CommentLength.Min}`,
  MessageGreaterMax: `Message greater than maximum allowed value ${CommentLength.Max}`,
} as const;

export const ParamDescription = {
  CommentId: 'Comment ID',
  PostId: 'Post ID',
} as const;

export const CommentResponseMessage = {
  CommentCreated: 'The new comment has been successfully created',
  CommentDeleted: 'The comment has been successfully deleted',
  CommentValidationError: 'Validation error when creating comment',
  CommentFound: 'Comment found',
  CommentNotFound: 'Comment not found',
  PostNotFound: 'Post not found',
  JwtAuthError: 'Failed user authorization with jwt',
  FoundCommentList: 'Successfully retrieving a list of comments based on request parameters',
  UserNotAuthor: 'The user is not the author of this comment'
} as const;
