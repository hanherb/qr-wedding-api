import { TypeOrmModuleOptions } from "@nestjs/typeorm";

interface DbConfiguration {
    db_config: TypeOrmModuleOptions
}

export const database = (): DbConfiguration => ({
    db_config: {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: false, // disabled for auto migration syncronize
        logging: false,
    },
})