import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "CarBrand",
      category_id: "CategoryId",
      daily_rate: 110.0,
      description: "Car Description",
      fine_amount: 40.0,
      license_plate: "DEF-1",
      name: "Car1",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "CarBrandTest",
      category_id: "CategoryId",
      daily_rate: 110.0,
      description: "Car Description",
      fine_amount: 40.0,
      license_plate: "DEF-1",
      name: "Car2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "CarBrandTest",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "CarBrandTest",
      category_id: "CategoryId",
      daily_rate: 110.0,
      description: "Car Description",
      fine_amount: 40.0,
      license_plate: "DEF-123456",
      name: "Car3",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "CarBrandTest",
      category_id: "12345",
      daily_rate: 110.0,
      description: "Car Description",
      fine_amount: 40.0,
      license_plate: "DEF-1",
      name: "Car4",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
