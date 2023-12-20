import { NextApiResponse, NextApiRequest, NextApiHandler } from "next";

const middleware = (err: any, req: NextApiRequest, res: NextApiResponse) => {
  err.statusCode = err.statusCode || 500;
  let error: any = { ...err };
  error.message = err.message;
  res.status(err.statusCode).json({
    error,
    message: error.message,
    stack: error.stack,
  });
};

export default middleware;
