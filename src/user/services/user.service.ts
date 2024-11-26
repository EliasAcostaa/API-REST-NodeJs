import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entitites/user.entity";

export class UserService extends BaseService<UserEntity> {
    constructor(){
        super(UserEntity);
    }

    async findAllUsers():Promise<UserEntity[]> {
        return (await this.execRepository).find()
    }
    async findUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }
    async createUser(body: UserDTO): Promise<UserEntity> {
        return (await this.execRepository).save(body);
    }
    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }
    async updateUser(id: string, infoupdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoupdate);
    }
}