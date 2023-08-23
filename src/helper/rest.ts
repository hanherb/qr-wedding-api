import { HttpException } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { catchError, lastValueFrom, map } from "rxjs"

export async function HttpGet(http: HttpService, url: string, params: any, headers: any): Promise<{ status: any, data: any }> {
    return await lastValueFrom(http.get(url, { params, headers }).pipe(
        catchError(err => {
            console.log(err)
            throw new HttpException(err, err.response.status)
        }),
        map(resp => {
            return { status: resp.status, data: resp.data }
        })
    ))
}

export async function HttpPost(http: HttpService, url: string, payload: any, headers: any): Promise<{ status: any, data: any }> {
    return await lastValueFrom(http.post(url, payload, { headers }).pipe(
        catchError(err => {
            console.log(err)
            throw new HttpException(err, err.response.status)
        }),
        map(resp => {
            return { status: resp.status, data: resp.data }
        })
    ))
}

export function HTTPSuccess(data: any) {
    return {
        meta: {
            code: 200,
            msg: "success"
        },
        data: data
    }
}