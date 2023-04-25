import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: () => "now()" })
    createdAt: Date;

    @Column({ default: () => "now()" })
    updatedAt: Date;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        createdAt:string,
        updatedAt:string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}
