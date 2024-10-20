import { Observable } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';

export function createViewModel() {
  const viewModel = new Observable();
  
  viewModel.rankings = [];

  firebase().database().ref('rankings').orderByChild('score').limitToLast(10).on('value', snapshot => {
    const rankings = [];
    snapshot.forEach(childSnapshot => {
      rankings.unshift(childSnapshot.val());
    });
    viewModel.set('rankings', rankings);
  });

  return viewModel;
}