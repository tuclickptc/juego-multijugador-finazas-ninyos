import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export function createViewModel(navigationContext) {
  const viewModel = new Observable();
  
  viewModel.finalScore = navigationContext.finalScore;
  viewModel.level = navigationContext.level;
  viewModel.lessons = [
    "Ahorrar regularmente es importante para tu futuro financiero.",
    "Invertir puede ser riesgoso, pero también puede traer grandes recompensas.",
    "Equilibrar gastos y ahorros es clave para una buena salud financiera.",
    "Los eventos inesperados pueden afectar tus finanzas, así que es bueno estar preparado.",
    "La educación financiera puede mejorar tus habilidades y resultados.",
    "Donar a la caridad no solo ayuda a otros, también puede traer beneficios inesperados."
  ];

  viewModel.onPlayAgain = () => {
    Frame.topmost().navigate({
      moduleName: "pages/game/game-page",
      clearHistory: true
    });
  };

  viewModel.onViewRanking = () => {
    Frame.topmost().navigate({
      moduleName: "pages/ranking/ranking-page"
    });
  };

  return viewModel;
}