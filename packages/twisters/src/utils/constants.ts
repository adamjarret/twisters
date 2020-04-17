import { createCursor } from './createCursor';
import { createStdinMuter } from './createStdinMuter';

export const sharedCursor = createCursor();

export const sharedStdinMuter = createStdinMuter();
