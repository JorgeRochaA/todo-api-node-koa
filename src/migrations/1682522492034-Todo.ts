import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Todo1682522492034 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "todos",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "title",
                    type: "varchar"
                },
                {
                    name:"completed",
                    type:"boolean",
                    default:false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                },{
                    name: "updatedAt",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "priority_index",
                    type: "integer",
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
