import { Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Injectable()
export class ItemsService {
  create(createItemInput: CreateItemInput) {
    console.log({ createItemInput });
    return 'This action adds a new item';
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemInput: UpdateItemInput) {
    console.log({ updateItemInput });
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
