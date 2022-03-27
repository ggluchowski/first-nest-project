import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import * as faker from '@faker-js/faker';
import { Tag } from 'src/products/db/tag.entity';
import { Product } from 'src/products/db/product.entity';
import { User } from 'src/users/db/users.entity';
import { UserAddress } from 'src/users/db/userAddress.entity';
import { Roles } from '../../shared/enums/roles.enum';

export class InitData1648239715305 implements MigrationInterface {
  private randomNumber(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private async saveAddress(): Promise<UserAddress[]> {
    const addressArr: UserAddress[] = [];
    const dataAmount = 150;

    for (let i = 0; i < dataAmount; i++) {
      const addressToSave = new UserAddress();
      addressToSave.country = faker.address.country();
      addressToSave.city = faker.address.cityName();
      addressToSave.street = faker.address.streetName();
      addressToSave.buildingNumber = faker.datatype.number({
        min: 1,
        max: 500,
        precision: 1,
      });
      addressToSave.flatNumber = faker.datatype.number({
        min: 1,
        max: 100,
        precision: 1,
      });
      addressArr.push(addressToSave);
    }

    await getRepository(UserAddress).insert(addressArr);
    console.log(dataAmount + ' addresses saved');
    return addressArr;
  }

  private async saveTags(): Promise<Tag[]> {
    const tagsArr: Tag[] = [];
    const tags = ['NEW', 'PROMO', 'LAST_ITEMS'];

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      const tagToSave = new Tag();
      tagToSave.name = tag;
      tagsArr.push(tagToSave);
    }

    await getRepository(Tag).insert(tagsArr);
    console.log('Tags saved');

    return tagsArr;
  }

  private async saveProducts(tags: Tag[]): Promise<Product[]> {
    const productsArr: Product[] = [];
    const dataAmount = 100;

    for (let i = 0; i < dataAmount; i++) {
      const productToSave = new Product();
      const productTags: Tag[] = [];
      const random = this.randomNumber(0, tags.length);
      const tagRandom = faker.random.arrayElements(tags, random);

      for (const i of tagRandom) {
        const tag = new Tag();
        tag.id = i.id;
        tag.name = i.name;
        productTags.push(tag);
      }

      productToSave.name = faker.commerce.product();
      productToSave.price = faker.datatype.float({
        min: 1,
        max: 10000,
        precision: 0.01,
      });
      productToSave.count = faker.datatype.number({
        min: 1,
        max: 100,
        precision: 1,
      });
      productToSave.createdAt = new Date();
      productToSave.updatedAt = new Date();
      productToSave.description = faker.commerce.productDescription();
      productToSave.tags = productTags;
      productsArr.push(productToSave);
    }

    await getRepository(Product).insert(productsArr);
    console.log(dataAmount + ' products saved');
    return productsArr;
  }

  private async saveUsers(address: UserAddress[]): Promise<User[]> {
    const usersArr: User[] = [];
    const dataAmount = 100;
    const userAddress: UserAddress[] = [];
    const random = this.randomNumber(0, address.length);
    const addressRandom = faker.random.arrayElements(address, random);

    for (let i = 0; i < dataAmount; i++) {
      const userToSave = new User();
      const roles = faker.random.objectElement(Roles, 'value');

      userToSave.id = faker.datatype.uuid();

      for (const i of addressRandom) {
        const address = new UserAddress();
        address.country = i.country;
        address.city = i.city;
        address.street = i.street;
        address.buildingNumber = i.buildingNumber;
        address.flatNumber = i.flatNumber;
        address.user = userToSave;
        userAddress.push(address);
      }

      userToSave.firstName = faker.name.firstName();
      userToSave.lastName = faker.name.lastName();
      userToSave.email = faker.internet.email();
      userToSave.position = roles;
      userToSave.address = userAddress;
      usersArr.push(userToSave);
    }

    await getRepository(User).insert(usersArr);
    console.log(dataAmount + ' users saved');
    return usersArr;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const tags = this.saveTags();
    this.saveProducts(await tags);
    const address = this.saveAddress();
    this.saveUsers(await address);
    console.log('Fake data end');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DELETE FROM tags;');
    queryRunner.query('DELETE FROM products;');
  }
}
