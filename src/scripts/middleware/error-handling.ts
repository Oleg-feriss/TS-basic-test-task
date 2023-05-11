import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/app.error';
import { HttpCode } from '../common/enums/http-code.enum';
import { ExceptionMessage } from '../common/enums/exception-message.enum';

export const errorResponder = (
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.header('Content-Type', 'application/json');

  const status = error.statusCode || 500;
  const message = error.message || ExceptionMessage.SERVER_ERROR;

  res.status(status).send({
    details: error.details ?? undefined,
    message,
  });
};

export const invalidPathHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(HttpCode.NOT_FOUND);
  res.send(ExceptionMessage.PAGE_NOT_FOUND);
};
