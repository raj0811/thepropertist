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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_service_1 = require("./database/database.service");
const database_module_1 = require("./database/database.module");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_service_1 = require("./user/user.service");
const user_controller_1 = require("./user/user.controller");
const user_module_1 = require("./user/user.module");
const agent_controller_1 = require("./agent/agent.controller");
const agent_module_1 = require("./agent/agent.module");
const agent_service_1 = require("./agent/agent.service");
const properties_service_1 = require("./properties/properties.service");
const properties_module_1 = require("./properties/properties.module");
const s3_bucket_module_1 = require("./s3-bucket/s3-bucket.module");
const enquiry_module_1 = require("./enquiry/enquiry.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.DB),
            database_module_1.DatabaseModule,
            user_module_1.UserModule,
            agent_module_1.AgentModule,
            properties_module_1.PropertiesModule,
            s3_bucket_module_1.S3BucketModule,
            enquiry_module_1.EnquiryModule],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, agent_controller_1.AgentController],
        providers: [app_service_1.AppService, database_service_1.DatabaseService, user_service_1.UserService, agent_service_1.AgentService, properties_service_1.PropertiesService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map