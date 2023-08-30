export async function DatetimeToTZ(datetime: Date) {
    return new Date(datetime.getTime() + 25200000)
}

export async function AdjustTimezone(datetime: Date) {
    if(!datetime) {
        return datetime
    }
    
    const offset = Math.abs(datetime.getTimezoneOffset())
    if(offset == 0) {
        datetime = await DatetimeToTZ(datetime)
    }

    return datetime
}

export async function RemoveTimezoneString(datetime: Date) {
    datetime = await AdjustTimezone(datetime)
    let str = datetime.toString()
    let arr = str.split(" ")
    
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].includes("GMT")) {
            arr.pop()
            i--
        }
    }
    
    str = arr.join(" ")

    return str
}