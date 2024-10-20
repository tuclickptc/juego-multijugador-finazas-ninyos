import { Application } from '@nativescript/core';
import { initializeFirebase } from './firebase-config';

initializeFirebase();

Application.run({ moduleName: 'app-root' });