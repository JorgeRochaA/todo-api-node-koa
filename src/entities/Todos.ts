import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todos {
  constructor(id: number, title: string, completed: boolean, createdAt: Date, updatedAt: Date,priority_index:number) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
    this.priority_index = priority_index;
  }

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  title: string;

    @Column({ default: false })
    completed: boolean;

    @Column({ default: () => "now()" })
    createdAt: Date;

    @Column({ default: () => "now()" })
    updatedAt: Date;

    @Column()
    priority_index: number;
}
