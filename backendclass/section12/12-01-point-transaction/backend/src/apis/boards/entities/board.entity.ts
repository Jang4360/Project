import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('increment') //mysql
  @Field(() => Int) //graphql
  number: number;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
