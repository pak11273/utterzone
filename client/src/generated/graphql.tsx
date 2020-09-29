import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  currentDate: Scalars['DateTime'];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  Resource?: Maybe<Resource>;
  me?: Maybe<User>;
  user: User;
  zone?: Maybe<Zone>;
  zones: Array<Zone>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryResourceArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryZoneArgs = {
  id: Scalars['String'];
};


export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  creatorId: Scalars['String'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  followers: Scalars['Float'];
  following: Scalars['Float'];
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Resource = {
  __typename?: 'Resource';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  votes?: Maybe<Scalars['Float']>;
  comments: Array<Comment>;
};

export type Comment = {
  __typename?: 'Comment';
  username?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  date: Scalars['DateTime'];
};

export type Zone = {
  __typename?: 'Zone';
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  app: Scalars['String'];
  course: Course;
  banned: Array<User>;
  hostId: Scalars['String'];
  token: Scalars['String'];
  participants: Array<User>;
  learningLanguage: Language;
  nativeLanguage: Language;
  maxParticipants: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  lastMessage: Message;
  password: Scalars['String'];
  public: Scalars['Boolean'];
  mature: Scalars['Boolean'];
  premium: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['String'];
  name: Scalars['String'];
  owner: User;
  zone: Course;
};

export enum Language {
  English = 'ENGLISH',
  Spanish = 'SPANISH',
  Portuguese = 'PORTUGUESE',
  French = 'FRENCH',
  Italian = 'ITALIAN',
  Dutch = 'DUTCH',
  Finnish = 'FINNISH',
  Danish = 'DANISH',
  Greek = 'GREEK',
  Norwegian = 'NORWEGIAN',
  Swedish = 'SWEDISH',
  Albanian = 'ALBANIAN',
  Armenian = 'ARMENIAN',
  Basque = 'BASQUE',
  Breton = 'BRETON',
  Catalan = 'CATALAN',
  Cornish = 'CORNISH',
  Estonian = 'ESTONIAN',
  Faroese = 'FAROESE',
  Flemish = 'FLEMISH',
  Georgian = 'GEORGIAN',
  Gothic = 'GOTHIC',
  Hungarian = 'HUNGARIAN',
  Icelandic = 'ICELANDIC',
  Irish = 'IRISH',
  Ladin = 'LADIN',
  Ladino = 'LADINO',
  Latvian = 'LATVIAN',
  Lithuanian = 'LITHUANIAN',
  Luxembourgish = 'LUXEMBOURGISH',
  Maltese = 'MALTESE',
  Manx = 'MANX',
  Occitan = 'OCCITAN',
  Romanian = 'ROMANIAN',
  Sami = 'SAMI',
  Ume = 'UME',
  Scots = 'SCOTS',
  Scottish = 'SCOTTISH',
  Welsh = 'WELSH',
  German = 'GERMAN',
  Indonesian = 'INDONESIAN',
  Korean = 'KOREAN',
  Thai = 'THAI',
  Vietnamese = 'VIETNAMESE',
  Mongolian = 'MONGOLIAN',
  Azerbaijani = 'AZERBAIJANI',
  Hawaiian = 'HAWAIIAN',
  Kazakh = 'KAZAKH',
  Ainu = 'AINU',
  Burmese = 'BURMESE',
  Cebuano = 'CEBUANO',
  Dzongkha = 'DZONGKHA',
  Javanese = 'JAVANESE',
  Karen = 'KAREN',
  Khmer = 'KHMER',
  Kyrgyz = 'KYRGYZ',
  Laz = 'LAZ',
  Lu = 'LU',
  Malay = 'MALAY',
  Maori = 'MAORI',
  Marshallese = 'MARSHALLESE',
  Nepali = 'NEPALI',
  Tagalog = 'TAGALOG',
  Tibetan = 'TIBETAN',
  Mandarin = 'MANDARIN',
  Cantonese = 'CANTONESE',
  Taishanese = 'TAISHANESE',
  Hakka = 'HAKKA',
  Japanese = 'JAPANESE',
  Kanji = 'KANJI',
  Bengali = 'BENGALI',
  Gujarati = 'GUJARATI',
  Hindi = 'HINDI',
  Telugu = 'TELUGU',
  Urdu = 'URDU',
  Marathi = 'MARATHI',
  Kannada = 'KANNADA',
  Malayalam = 'MALAYALAM',
  Pali = 'PALI',
  Punjabi = 'PUNJABI',
  Sanskrit = 'SANSKRIT',
  Tamang = 'TAMANG',
  Tamil = 'TAMIL',
  Arabic = 'ARABIC',
  Hebrew = 'HEBREW',
  Turkish = 'TURKISH',
  Aramaic = 'ARAMAIC',
  Kurdish = 'KURDISH',
  Persian = 'PERSIAN',
  Yiddish = 'YIDDISH',
  Russian = 'RUSSIAN',
  Bosnian = 'BOSNIAN',
  Croatian = 'CROATIAN',
  Czech = 'CZECH',
  Polish = 'POLISH',
  Serbian = 'SERBIAN',
  Bulgarian = 'BULGARIAN',
  Slovak = 'SLOVAK',
  Slovenian = 'SLOVENIAN',
  Ukrainian = 'UKRAINIAN',
  Belarusian = 'BELARUSIAN',
  Circassian = 'CIRCASSIAN',
  Macedonian = 'MACEDONIAN',
  Ossetic = 'OSSETIC',
  Coptic = 'COPTIC',
  Swahili = 'SWAHILI',
  Afrikaans = 'AFRIKAANS',
  Akan = 'AKAN',
  Amharic = 'AMHARIC',
  Hausa = 'HAUSA',
  Kaonde = 'KAONDE',
  Kinyarwanda = 'KINYARWANDA',
  Luganda = 'LUGANDA',
  Malagasy = 'MALAGASY',
  Mandinka = 'MANDINKA',
  Nyanja = 'NYANJA',
  Somali = 'SOMALI',
  Soninke = 'SONINKE',
  Wolof = 'WOLOF',
  Zulu = 'ZULU',
  Latin = 'LATIN',
  Cherokee = 'CHEROKEE',
  Algonquian = 'ALGONQUIAN',
  Alutiiq = 'ALUTIIQ',
  Choctaw = 'CHOCTAW',
  Greenlandic = 'GREENLANDIC',
  Guarani = 'GUARANI',
  Inuktitut = 'INUKTITUT',
  Lakota = 'LAKOTA',
  Nahuatl = 'NAHUATL',
  Quechua = 'QUECHUA',
  Esperanto = 'ESPERANTO',
  Interlingua = 'INTERLINGUA',
  Klingon = 'KLINGON',
  Lojban = 'LOJBAN'
}

export type Message = {
  __typename?: 'Message';
  zone: Scalars['String'];
  username: Scalars['String'];
  message: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  pubSubMutation: Scalars['Boolean'];
  publisherMutation: Scalars['Boolean'];
  pubSubMutationToDynamicTopic: Scalars['Boolean'];
  vote: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  addNewComment: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  createUser: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  joinZone: Zone;
  createZone: Zone;
  createZoneMessageMutation: Scalars['Boolean'];
};


export type MutationPubSubMutationArgs = {
  message?: Maybe<Scalars['String']>;
};


export type MutationPublisherMutationArgs = {
  message?: Maybe<Scalars['String']>;
};


export type MutationPubSubMutationToDynamicTopicArgs = {
  message?: Maybe<Scalars['String']>;
  topic: Scalars['String'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  text: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationAddNewCommentArgs = {
  comment: CommentInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationCreateUserArgs = {
  input: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationJoinZoneArgs = {
  id: Scalars['String'];
};


export type MutationCreateZoneArgs = {
  input: ZoneInput;
};


export type MutationCreateZoneMessageMutationArgs = {
  message: MessageInput;
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type CommentInput = {
  name: Scalars['ID'];
  username: Scalars['String'];
  content: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type ZoneInput = {
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  app?: Maybe<Scalars['String']>;
  learningLanguage: Scalars['String'];
  nativeLanguage: Scalars['String'];
  hostId: Scalars['String'];
  maxParticipants: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  mature?: Maybe<Scalars['Boolean']>;
  premium?: Maybe<Scalars['Boolean']>;
};

export type MessageInput = {
  token?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  zone: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  normalSubscription: Notification;
  subscriptionWithFilter: Notification;
  subscriptionWithFilterToDynamicTopic: Notification;
  newComments: Comment;
  userStatus: UserStatus;
  createZonePub: Message;
};


export type SubscriptionSubscriptionWithFilterToDynamicTopicArgs = {
  topic: Scalars['String'];
};


export type SubscriptionNewCommentsArgs = {
  name: Scalars['ID'];
};


export type SubscriptionUserStatusArgs = {
  status: Scalars['String'];
};


export type SubscriptionCreateZonePubArgs = {
  token: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
};

export type UserStatus = {
  __typename?: 'UserStatus';
  status: Scalars['String'];
};

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'points' | 'textSnippet' | 'voteStatus'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text' | 'points' | 'creatorId'>
  ) }
);

export type CreateZoneMutationVariables = Exact<{
  input: ZoneInput;
}>;


export type CreateZoneMutation = (
  { __typename?: 'Mutation' }
  & { createZone: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id' | 'token'>
  ) }
);

export type CreateZoneMessageMutationVariables = Exact<{
  message: MessageInput;
}>;


export type CreateZoneMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createZoneMessageMutation'>
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type JoinZoneMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type JoinZoneMutation = (
  { __typename?: 'Mutation' }
  & { joinZone: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id'>
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type CreateUserMutationVariables = Exact<{
  input: UsernamePasswordInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'textSnippet'>
  )> }
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'points' | 'text' | 'voteStatus'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export type ZoneQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ZoneQuery = (
  { __typename?: 'Query' }
  & { zone?: Maybe<(
    { __typename?: 'Zone' }
    & Pick<Zone, 'id' | 'app'>
  )> }
);

export type ZonesQueryVariables = Exact<{ [key: string]: never; }>;


export type ZonesQuery = (
  { __typename?: 'Query' }
  & { zones: Array<(
    { __typename?: 'Zone' }
    & Pick<Zone, 'id' | 'app' | 'hostId' | 'description' | 'name' | 'mature' | 'maxParticipants' | 'premium' | 'token'>
  )> }
);

export type CreateZonePubSubscriptionVariables = Exact<{
  token: Scalars['String'];
}>;


export type CreateZonePubSubscription = (
  { __typename?: 'Subscription' }
  & { createZonePub: (
    { __typename?: 'Message' }
    & Pick<Message, 'username' | 'message'>
  ) }
);

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  points
  textSnippet
  voteStatus
  creator {
    id
    username
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    createdAt
    updatedAt
    title
    text
    points
    creatorId
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateZoneDocument = gql`
    mutation CreateZone($input: ZoneInput!) {
  createZone(input: $input) {
    id
    token
  }
}
    `;
export type CreateZoneMutationFn = Apollo.MutationFunction<CreateZoneMutation, CreateZoneMutationVariables>;

/**
 * __useCreateZoneMutation__
 *
 * To run a mutation, you first call `useCreateZoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateZoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createZoneMutation, { data, loading, error }] = useCreateZoneMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateZoneMutation(baseOptions?: Apollo.MutationHookOptions<CreateZoneMutation, CreateZoneMutationVariables>) {
        return Apollo.useMutation<CreateZoneMutation, CreateZoneMutationVariables>(CreateZoneDocument, baseOptions);
      }
export type CreateZoneMutationHookResult = ReturnType<typeof useCreateZoneMutation>;
export type CreateZoneMutationResult = Apollo.MutationResult<CreateZoneMutation>;
export type CreateZoneMutationOptions = Apollo.BaseMutationOptions<CreateZoneMutation, CreateZoneMutationVariables>;
export const CreateZoneMessageDocument = gql`
    mutation CreateZoneMessage($message: MessageInput!) {
  createZoneMessageMutation(message: $message)
}
    `;
export type CreateZoneMessageMutationFn = Apollo.MutationFunction<CreateZoneMessageMutation, CreateZoneMessageMutationVariables>;

/**
 * __useCreateZoneMessageMutation__
 *
 * To run a mutation, you first call `useCreateZoneMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateZoneMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createZoneMessageMutation, { data, loading, error }] = useCreateZoneMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useCreateZoneMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateZoneMessageMutation, CreateZoneMessageMutationVariables>) {
        return Apollo.useMutation<CreateZoneMessageMutation, CreateZoneMessageMutationVariables>(CreateZoneMessageDocument, baseOptions);
      }
export type CreateZoneMessageMutationHookResult = ReturnType<typeof useCreateZoneMessageMutation>;
export type CreateZoneMessageMutationResult = Apollo.MutationResult<CreateZoneMessageMutation>;
export type CreateZoneMessageMutationOptions = Apollo.BaseMutationOptions<CreateZoneMessageMutation, CreateZoneMessageMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const JoinZoneDocument = gql`
    mutation joinZone($id: String!) {
  joinZone(id: $id) {
    id
  }
}
    `;
export type JoinZoneMutationFn = Apollo.MutationFunction<JoinZoneMutation, JoinZoneMutationVariables>;

/**
 * __useJoinZoneMutation__
 *
 * To run a mutation, you first call `useJoinZoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinZoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinZoneMutation, { data, loading, error }] = useJoinZoneMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinZoneMutation(baseOptions?: Apollo.MutationHookOptions<JoinZoneMutation, JoinZoneMutationVariables>) {
        return Apollo.useMutation<JoinZoneMutation, JoinZoneMutationVariables>(JoinZoneDocument, baseOptions);
      }
export type JoinZoneMutationHookResult = ReturnType<typeof useJoinZoneMutation>;
export type JoinZoneMutationResult = Apollo.MutationResult<JoinZoneMutation>;
export type JoinZoneMutationOptions = Apollo.BaseMutationOptions<JoinZoneMutation, JoinZoneMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: UsernamePasswordInput!) {
  createUser(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $title: String!, $text: String!) {
  updatePost(id: $id, title: $title, text: $text) {
    id
    title
    text
    textSnippet
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, baseOptions);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    createdAt
    updatedAt
    title
    points
    text
    voteStatus
    creator {
      id
      username
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions?: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const ZoneDocument = gql`
    query Zone($id: String!) {
  zone(id: $id) {
    id
    app
  }
}
    `;

/**
 * __useZoneQuery__
 *
 * To run a query within a React component, call `useZoneQuery` and pass it any options that fit your needs.
 * When your component renders, `useZoneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useZoneQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useZoneQuery(baseOptions?: Apollo.QueryHookOptions<ZoneQuery, ZoneQueryVariables>) {
        return Apollo.useQuery<ZoneQuery, ZoneQueryVariables>(ZoneDocument, baseOptions);
      }
export function useZoneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ZoneQuery, ZoneQueryVariables>) {
          return Apollo.useLazyQuery<ZoneQuery, ZoneQueryVariables>(ZoneDocument, baseOptions);
        }
export type ZoneQueryHookResult = ReturnType<typeof useZoneQuery>;
export type ZoneLazyQueryHookResult = ReturnType<typeof useZoneLazyQuery>;
export type ZoneQueryResult = Apollo.QueryResult<ZoneQuery, ZoneQueryVariables>;
export const ZonesDocument = gql`
    query Zones {
  zones {
    id
    app
    hostId
    description
    name
    mature
    maxParticipants
    premium
    token
  }
}
    `;

/**
 * __useZonesQuery__
 *
 * To run a query within a React component, call `useZonesQuery` and pass it any options that fit your needs.
 * When your component renders, `useZonesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useZonesQuery({
 *   variables: {
 *   },
 * });
 */
export function useZonesQuery(baseOptions?: Apollo.QueryHookOptions<ZonesQuery, ZonesQueryVariables>) {
        return Apollo.useQuery<ZonesQuery, ZonesQueryVariables>(ZonesDocument, baseOptions);
      }
export function useZonesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ZonesQuery, ZonesQueryVariables>) {
          return Apollo.useLazyQuery<ZonesQuery, ZonesQueryVariables>(ZonesDocument, baseOptions);
        }
export type ZonesQueryHookResult = ReturnType<typeof useZonesQuery>;
export type ZonesLazyQueryHookResult = ReturnType<typeof useZonesLazyQuery>;
export type ZonesQueryResult = Apollo.QueryResult<ZonesQuery, ZonesQueryVariables>;
export const CreateZonePubDocument = gql`
    subscription createZonePub($token: String!) {
  createZonePub(token: $token) {
    username
    message
  }
}
    `;

/**
 * __useCreateZonePubSubscription__
 *
 * To run a query within a React component, call `useCreateZonePubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCreateZonePubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateZonePubSubscription({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCreateZonePubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CreateZonePubSubscription, CreateZonePubSubscriptionVariables>) {
        return Apollo.useSubscription<CreateZonePubSubscription, CreateZonePubSubscriptionVariables>(CreateZonePubDocument, baseOptions);
      }
export type CreateZonePubSubscriptionHookResult = ReturnType<typeof useCreateZonePubSubscription>;
export type CreateZonePubSubscriptionResult = Apollo.SubscriptionResult<CreateZonePubSubscription>;