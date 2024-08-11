import { ValidationError } from 'yup';
import IFormattedYupError from '../types/IFormattedYupError.d';


interface YupError {
  path?: string;
  message: string;
}

const formatYupError = (error: ValidationError): IFormattedYupError[] => error.inner.map((e: YupError) => ({
    path: e.path || '',
    message: e.message,
  }));

export default formatYupError;
