import express, { Request, Response, Router, NextFunction } from 'express';
import { UsersController } from '../controllers';

const router: Router = Router();
const controller: UsersController = new UsersController();

router.get('/', async (request: Request, response: Response) => {
  await controller.getAllUsers(request, response);
});

router.post('/', async (request: Request, response: Response) => {
  await controller.addUser(request, response);
});

router.patch('/', async (request: Request, response: Response) => {
  await controller.updateUser(request, response);
});

router.delete('/', async (request: Request, response: Response) => {
  await controller.deleteUser(request, response);
});

export const usersRouter: Router = router;