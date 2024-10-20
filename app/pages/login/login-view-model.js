import { Observable } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';

export function createViewModel() {
  const viewModel = new Observable();
  viewModel.username = "";
  viewModel.password = "";

  viewModel.onLogin = () => {
    firebase().auth().signInWithEmailAndPassword(viewModel.username, viewModel.password)
      .then(() => {
        console.log("Usuario autenticado");
        // Navegar a la página principal del juego
      })
      .catch(error => console.error("Error de autenticación:", error));
  };

  viewModel.onRegister = () => {
    // Navegar a la página de registro
  };

  return viewModel;
}