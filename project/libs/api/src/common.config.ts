export enum ApplicationServiceURL {
  Blog = 'http://localhost:3001/api/posts',
  Users = 'http://localhost:3002/api/auth',
  FilesStorage = 'http://localhost:3003/api/files',
  Notify = 'http://localhost:3004/api',
}

export const HttpClient = {
  MaxRedirects: 5,
  Timeout: 3000
}
