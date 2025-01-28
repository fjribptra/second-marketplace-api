import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { UsersService } from "src/users/users.service";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async register(name:string, email: string, password: string) {
        //check if email is in use
        const users = await this.userService.find(email);
        if(users.length) {
            throw new BadRequestException('User already exists');
        }

        //hash the password
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 64)) as Buffer;
        const hashedPassword = salt + '.' + hash.toString('hex');
        
        // create a new user
        const user = await this.userService.create(name, email, hashedPassword);
        return user
    }

    async login(email: string, password: string) {
        const [user] = await this.userService.find(email);
        if(!user) {
            throw new NotFoundException('Email is not registered');
        }

        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 64)) as Buffer;

        if(storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Invalid credentials');
        }

        return user;
    }
}