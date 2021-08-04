import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ISpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>
}

export { ISpecificationRepository, ISpecificationDTO };
