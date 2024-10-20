import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-database';
import '@nativescript/firebase-auth';

export function initializeFirebase() {
  firebase().initializeApp({
    // Aquí irían las credenciales de Firebase
  }).then(() => {
    console.log("Firebase inicializado correctamente");
  }).catch(error => {
    console.log(`Error al inicializar Firebase: ${error}`);
  });
}