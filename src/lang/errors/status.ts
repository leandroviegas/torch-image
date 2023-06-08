type Status = '400' | '401' | '404';

const status: { [key: string]: Status } = {
    "username-must-be-3-24-len": '400',
    "user-not-found": '404',
}

export default status;