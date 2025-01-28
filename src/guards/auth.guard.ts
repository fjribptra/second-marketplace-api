import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AuthGuard implements CanActivate {
    canActivate(ctx: ExecutionContext) {
        const request = ctx.switchToHttp().getRequest();
        return request.session.userId;
    }
}