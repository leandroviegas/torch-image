import { NextApiRequest, NextApiResponse } from 'next';
import { FormError, Field } from '@/types/Errors';
import { GetErrorDetails } from '@/lang/errors';

const catchAsyncErrors = (handle: (req: NextApiRequest, res: NextApiResponse, next: any) => Promise<void>) =>
  (req: NextApiRequest, res: NextApiResponse, next: any) =>
    Promise.resolve(handle(req, res, next)).catch((e) => {
      let errors = e;
      let lang = "pt-BR";

      console.error(e)

      if (e instanceof FormError)
        errors.fields = errors.fields.map((field: Field) => ({ ...field, message: GetErrorDetails(field.message, lang).message }));

      if (e instanceof Error)
        errors = GetErrorDetails(e.message, lang);

      res.status(errors.status).json({ errors })
    });

export default catchAsyncErrors