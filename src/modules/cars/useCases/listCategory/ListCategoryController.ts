import { Request, Response } from "express";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
  constructor(private listCaregoryUseCase: ListCategoryUseCase) {}

  handle(request: Request, response: Response) {
    const allCategories = this.listCaregoryUseCase.execute();

    return response.status(200).json(allCategories);
  }
}

export { ListCategoryController };
