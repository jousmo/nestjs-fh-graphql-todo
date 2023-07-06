import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @Column({ type: 'float', default: 0 })
  @Field(() => Float)
  quantity: number;

  @Column({ type: 'varchar', name: 'quantity_units', nullable: true })
  @Field(() => String, { nullable: true })
  quantityUnits?: string;
}
