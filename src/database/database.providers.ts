import { DataSource } from 'typeorm'
import { environmentVars } from 'src/config';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: environmentVars.hostDB,
                port: environmentVars.portDB,
                username: environmentVars.usernameDB,
                password: environmentVars.passwordDB,
                database: environmentVars.nameDB,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });
            console.log('Database connected')
            return dataSource.initialize();
        }
    }
]