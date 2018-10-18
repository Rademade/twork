import { Request, Response } from "express";

export type JwtUserPayload = {
  id: string,
  name: string;
  email: string;
  defaultWorkspaceId: number;
};
export interface AppRequest extends Request {
  user: JwtUserPayload;
}

export interface AppResponse extends Response {

}