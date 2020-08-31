
import { Dictionary} from 'lodash';

export type ErrorCallback = (err: any ) => String;

export interface ITranslationErrorsSettings extends Dictionary<string | ErrorCallback>
{

}
