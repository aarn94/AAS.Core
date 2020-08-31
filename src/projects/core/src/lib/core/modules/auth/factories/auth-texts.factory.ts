import { InternalizationService } from '../../translate/services';
import { AuthTextsService } from '../services';

export function authTextsLoader(internalizationService: InternalizationService): AuthTextsService {
  return new AuthTextsService(internalizationService);
}
