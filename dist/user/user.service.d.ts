import { DatabaseService } from "../database/database.service";
import { CreateUserDto, LoginUserDto } from "../utils/dto";
export declare class UserService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createUserDto: CreateUserDto): Promise<{
        msg: string;
        email: string;
        name: string;
        number: string;
        userId: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        msg: string;
        token: string;
    }>;
    verifyLoginToken(token: string): Promise<any>;
    getUser(id: string): Promise<import("mongoose").Document<unknown, {}, import("../database/schema/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../database/schema/user.schema").User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
