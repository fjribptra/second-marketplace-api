import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    findAll() {
        return this.usersRepository.find();
    }
    create(name: string, email: string, password: string) {
        const user = this.usersRepository.create({name, email, password});
        return this.usersRepository.save(user);
    }

    async findOneBy(id: number) {
        const user = await this.usersRepository.findOneBy({id});
        if(!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOneBy(id);
        Object.assign(user, attrs);
        return this.usersRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.findOneBy(id);
        return this.usersRepository.remove(user);
    }
}
