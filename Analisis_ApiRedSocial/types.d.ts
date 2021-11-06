declare namespace Express {
  export interface Request {
    userPayload;
    tenant?: string;
  }
}
interface MulterRequest extends Request {
  file: any;
}
