import {MigrationInterface, QueryRunner} from "typeorm";

export class init1598837868819 implements MigrationInterface {
    name = 'init1598837868819'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "updoot" ("value" integer NOT NULL, "userId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_6476d7e464bcb8571004134515c" PRIMARY KEY ("userId", "postId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "points" integer NOT NULL DEFAULT 0, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "avatar" character varying NOT NULL, "gender" character varying NOT NULL, "language" character varying NOT NULL, "twitter" character varying NOT NULL, "timezone" character varying NOT NULL, "bio" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "zone" ("id" SERIAL NOT NULL, "hostId" integer NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bd3989e5a3c3fb5ed546dfaf832" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "ProfileId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profileId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "updoot" ADD CONSTRAINT "FK_9df9e319a273ad45ce509cf2f68" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "updoot" ADD CONSTRAINT "FK_fd6b77bfdf9eae6691170bc9cb5" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "zone" ADD CONSTRAINT "FK_5d038dd944056ac7de7d2626a8b" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`, undefined);
        await queryRunner.query(`ALTER TABLE "zone" DROP CONSTRAINT "FK_5d038dd944056ac7de7d2626a8b"`, undefined);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"`, undefined);
        await queryRunner.query(`ALTER TABLE "updoot" DROP CONSTRAINT "FK_fd6b77bfdf9eae6691170bc9cb5"`, undefined);
        await queryRunner.query(`ALTER TABLE "updoot" DROP CONSTRAINT "FK_9df9e319a273ad45ce509cf2f68"`, undefined);
        await queryRunner.query(`DROP TABLE "organization"`, undefined);
        await queryRunner.query(`DROP TABLE "message"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "zone"`, undefined);
        await queryRunner.query(`DROP TABLE "profile"`, undefined);
        await queryRunner.query(`DROP TABLE "post"`, undefined);
        await queryRunner.query(`DROP TABLE "updoot"`, undefined);
    }

}
