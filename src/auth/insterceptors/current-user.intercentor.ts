import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../../users/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private userService: UsersService) {}

    async intercept(ctx: ExecutionContext, next: CallHandler){
        const request = ctx.switchToHttp().getRequest();
        const { userId } = request.session;
        if(userId) {
            const user = await this.userService.findOneBy(userId);
            request.currentUser = user;
        }
        return next.handle();
    }
}