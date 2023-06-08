import en from "./en"
import ptBR from "./pt-BR"

import status from "./status"

export const GetErrorDetails: (errorCode: string, lang?: string) => { message: string, status: string } = (errorCode, lang) => {
    const defaultLang = en;
    let errorDetails = { message: errorCode, status: status[errorCode] ?? '400' }

    switch (lang) {
        case "pt-BR":
            errorDetails.message = ptBR[errorCode]
            break;
        default:
            errorDetails.message = defaultLang[errorCode]
            break;
    }

    errorDetails = { ...errorDetails, message: errorDetails.message ?? defaultLang[errorCode] ?? errorCode ?? "Unknown error" }

    return errorDetails;
}