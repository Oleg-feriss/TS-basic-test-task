import { NextFunction, Request, Response } from 'express';

import { rocketService } from '../services';
import { HttpCode } from '../common/enums/http-code.enum';
import { RocketGetByNameRequest } from '../types/rocket-get-by-name-request.interface';
import { AddNewRocketRequest } from '../types/add-new-rocket-request.interface';

class RocketController {
  public getAllSortedRockets(
    _req: Request,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const sortedRockets = rocketService.getAllSortedRockets();

      res.set('Content-Type', 'text/plain');
      res.status(HttpCode.OK).send(sortedRockets);
    } catch (error) {
      next(error);
    }
  }

  public getRocketByName(
    req: Request<RocketGetByNameRequest>,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const { rocketName } = req.params;

      const rocketByName = rocketService.getRocketByName(rocketName);

      if (rocketByName) {
        res
          .status(HttpCode.OK)
          .send({ date: new Date().toISOString(), name: rocketByName });
        return;
      }

      res.status(HttpCode.NOT_FOUND).send();
    } catch (error) {
      next(error);
    }
  }

  public addNewRocket(
    req: Request<
      Record<string, never>,
      Record<string, never>,
      AddNewRocketRequest
    >,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const { name } = req.body;
      const isRocketExists = rocketService.isRocketExists(name);

      if (isRocketExists || name === 'list') {
        res.status(HttpCode.CONFLICT).send();
      }

      rocketService.addNewRocket(name);

      res.status(HttpCode.OK).send();
    } catch (error) {
      next(error);
    }
  }
}

export const rocketController = new RocketController();
