import { NextApiRequest, NextApiResponse } from "next/types";

type MethodTypes = (req: NextApiRequest, res: NextApiResponse, next?: any) => Promise<void>

export class ApiHandler {

    private response: NextApiResponse;

    private request: NextApiRequest;

    public methods: { GET: MethodTypes, POST: MethodTypes, PUT: MethodTypes, DELETE: MethodTypes };

    public exec() {
        switch (this.request.method) {
            case "GET":
                this.methods.GET(this.request, this.response);
                break;
            case "POST":
                this.methods.POST(this.request, this.response);
                break;
            case "PUT":
                this.methods.PUT(this.request, this.response);
                break;
            case "DELETE":
                this.methods.DELETE(this.request, this.response);
                break;
            default:
                this.response.status(405).json({ error: "Method not allowed" })
        }
    }

    constructor(req: NextApiRequest, res: NextApiResponse) {
        this.response = res;
        this.request = req;

        const ErrorMethod = async (req: NextApiRequest, res: NextApiResponse) => { res.status(405).json({ error: "Method not allowed" }) }

        this.methods = {
            GET: ErrorMethod,
            POST: ErrorMethod,
            PUT: ErrorMethod,
            DELETE: ErrorMethod
        }
    }
}