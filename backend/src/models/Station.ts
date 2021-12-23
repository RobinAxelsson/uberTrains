import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class station {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
}