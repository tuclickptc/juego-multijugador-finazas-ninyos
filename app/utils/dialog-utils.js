import { alert } from "@nativescript/core";

export function showMessage(message) {
  return alert({
    title: "Mensaje",
    message: message,
    okButtonText: "OK"
  });
}