import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductAddDescription1648164874536 implements MigrationInterface {
  name = 'ProductAddDescription1648164874536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`info\` text(100) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`info\``);
  }
}
