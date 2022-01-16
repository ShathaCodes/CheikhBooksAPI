import { Repository, UpdateResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export abstract class CrudService<Entity> {
  constructor(private repository: Repository<Entity>) {}

  findAll(options): Promise<Entity[]> {
    return this.repository.find();
  }
  create(addobj): Promise<Entity> {
    return this.repository.save(addobj);
  }
  findOne(id: number): Promise<Entity> {
    return this.repository.findOne(id);
  }
  async update(id: number, updateobj): Promise<Entity> {
    const newobj = await this.repository.preload({
      id,
      ...updateobj,
    });
    if (newobj) {
      return this.repository.save(newobj);
    }
    throw new NotFoundException('Objet innexistant');
  }
  remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }
  restore(id: number): Promise<UpdateResult> {
    return this.repository.restore(id);
  }
}
