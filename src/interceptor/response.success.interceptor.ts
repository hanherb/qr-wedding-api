import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { HTTPSuccess } from "src/helper/rest";

@Injectable()
export class ResponseSuccessInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        
        return next.handle().pipe(
            map(async response => {
                const resp = await response
                
                context.switchToHttp().getResponse().status(200)
                
                return HTTPSuccess(resp)
            })
        )
    }
}