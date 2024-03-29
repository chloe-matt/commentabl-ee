export const schema = gql`
  type CommentsAuthors {
    author: Author
  }

  type Comment {
    id: ID!
    website: Website!
    websiteId: ID!
    link: String!
    message: String!
    parentId: ID
    isSpam: Boolean!
    isPublished: Boolean!
    isDeleted: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime
    createdBy: Author
    authors: [CommentsAuthors]
  }

  type CommentWithReplies {
    parent: Comment!
    replies: [Comment]
    """
    We use this field resolver from the comment widget
    """
    publicReplies: [Comment]
  }

  type CommentsData {
    pagination: Pagination!
    edges: [CommentWithReplies]!
  }

  type Query {
    comments(websiteId: ID!): CommentsData! @requireAuth
    comment(id: ID!): Comment @requireAuth
    """
    The query that will be called by web form
    """
    publicComments(link: String!): CommentsData! @skipAuth
  }

  input CreateCommentInput {
    websiteId: ID!
    link: String!
    message: String!
    parentId: ID
    isSpam: Boolean!
    isPublished: Boolean!
    isDeleted: Boolean!
    createdBy: ID
  }

  input UpdateCommentInput {
    websiteId: ID
    link: String
    message: String
    parentId: ID
    isSpam: Boolean
    isPublished: Boolean
    isDeleted: Boolean
  }

  input PublicCreateCommentInput {
    link: String!
    parentCommentId: ID
    authorName: String!
    authorEmail: EmailAddress
    comment: String!
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: ID!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: ID!): Comment! @requireAuth
    """
    The mutation that will be called by web form
    """
    publicCreateComment(input: PublicCreateCommentInput!): Comment @skipAuth
  }
`
