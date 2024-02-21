"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const boards_module_1 = require("./apis/boards/src/boards.module");
const apollo_1 = require("@nestjs/apollo");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const products_modules_1 = require("./apis/porducts/products.modules");
const productsCategories_module_1 = require("./apis/productsCategories/productsCategories.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            boards_module_1.BoardsModule,
            products_modules_1.ProductsModule,
            productsCategories_module_1.ProductsCategoriesModule,
            config_1.ConfigModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: "src/commons/graphql/schema.gql",
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.DATABASE_TYPE,
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_DATABASE,
                entities: [__dirname + "/apis/**/*.entity.*"],
                synchronize: true,
                logging: true,
            }),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map