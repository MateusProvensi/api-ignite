import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description car",
      daily_rate: 250.0,
      license_plate: "ABC189",
      fine_amount: 60,
      brand: "Brand Car",
      category_id: "Category Id",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with exists license_plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car",
        description: "Description car",
        daily_rate: 250.0,
        license_plate: "ABC189",
        fine_amount: 60,
        brand: "Brand Car",
        category_id: "Category Id",
      });

      await createCarUseCase.execute({
        name: "Name Car",
        description: "Description car",
        daily_rate: 250.0,
        license_plate: "ABC189",
        fine_amount: 60,
        brand: "Brand Car",
        category_id: "Category Id",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with available 'true' by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description car",
      daily_rate: 250.0,
      license_plate: "ABCE-123",
      fine_amount: 60,
      brand: "Brand Car",
      category_id: "Category Id",
    });

    expect(car.available).toBe(true);
  });
});
