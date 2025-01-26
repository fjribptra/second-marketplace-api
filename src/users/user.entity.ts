import { Exclude } from "class-transformer";
import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id' + this.id);
    }

    @AfterInsert()
    logUpdate() {
        console.log('Updated User with id' + this.id);
    }

    @AfterInsert()
    logRemove() {
        console.log('Removed User with id' + this.id);
    }
}