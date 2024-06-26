import { Request } from 'express';

export type HttpLocalUserPayload = {
  email: string;
  password: string;
};

export type HttpUserPayload = {
  id: string;
  email: string;
};

export type HttpRequestWithUser = Request & { user: HttpUserPayload };

export type HttpJwtPayload = {
  id: string;
};

export type HttpLoggedInUser = {
  id: string;
  accessToken: string;
};
