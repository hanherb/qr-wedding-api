import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class ResponseErrorInterceptor implements ExceptionFilter {
    constructor() {}

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const message = exception.message

        // console.log(JSON.stringify(exception.getResponse()))

        let status: number
        if(typeof exception.getStatus === 'function') {
            status = exception.getStatus()
        } else {
            status = 500
        }

        let error: any
        if(typeof exception.getResponse === 'function') {
            error = exception.getResponse()['message']
        } else {
            error = message
        }

        response.status(status).json({
            meta: {
                code: status,
                msg: status !== 500 ? message : 'Something went wrong. Please try again.'
            },
            error: error
        })
    }
}