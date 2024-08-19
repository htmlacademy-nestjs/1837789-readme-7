export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  JwtAuthError: 'Failed user authorization with jwt',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
  UserPasswordWrong: 'User password is wrong',
  GettingUsersById: 'getting a list of users by ID',
  BadMongoIdError: 'Bad entity mongo ID',
  GettingPublishersList: 'getting a list of publishers the current user is subscribed to',
} as const;

export enum AuthUserMessage {
  Exists = 'User with this email exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong'
}

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
  DateBirthNotValid: 'The user date birth is not valid',
} as const;

export const PasswordLength = {
  Min: 6,
  Max: 12
};

export const Avatar = {
  MaxSize: 500000,
  AvailableTypes: /(jpe?g|png)/
};

export const NameLength = {
  Min: 3,
  Max: 50
};
