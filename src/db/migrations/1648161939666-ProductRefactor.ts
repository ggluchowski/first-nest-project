import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductRefactor1648161939666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE pet (name varchar(20))');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE pet');
  }
}
