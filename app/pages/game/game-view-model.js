import { Observable } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';
import { showMessage } from '../../utils/dialog-utils';

export function createViewModel() {
  const viewModel = new Observable();
  
  viewModel.playerName = "";
  viewModel.playerMoney = 1000;
  viewModel.currentTurn = 1;
  viewModel.maxTurns = 10;
  viewModel.level = 1;
  viewModel.lastEvent = "";
  viewModel.currentTip = "";
  
  const educationalTips = [
    "Ahorrar significa guardar dinero para el futuro.",
    "Invertir es usar tu dinero para intentar ganar más.",
    "Un presupuesto te ayuda a planificar cómo gastar tu dinero.",
    "Ganar intereses significa que tu dinero crece con el tiempo.",
    "Donar es una forma de ayudar a otros con tu dinero.",
    "Aprender sobre finanzas te ayuda a tomar mejores decisiones con tu dinero.",
  ];
  
  viewModel.gameActions = [
    {
      description: "Invertir en acciones",
      buttonText: "Invertir $100",
      onTap: () => viewModel.invest(100)
    },
    {
      description: "Ahorrar en el banco",
      buttonText: "Ahorrar $50",
      onTap: () => viewModel.save(50)
    },
    {
      description: "Gastar en diversión",
      buttonText: "Gastar $30",
      onTap: () => viewModel.spend(30)
    },
    {
      description: "Iniciar un negocio",
      buttonText: "Invertir $200",
      onTap: () => viewModel.startBusiness(200)
    },
    {
      description: "Donar a caridad",
      buttonText: "Donar $20",
      onTap: () => viewModel.donate(20)
    },
    {
      description: "Educación financiera",
      buttonText: "Estudiar ($50)",
      onTap: () => viewModel.study(50)
    }
  ];

  viewModel.invest = (amount) => {
    if (viewModel.playerMoney >= amount) {
      viewModel.playerMoney -= amount;
      const profit = Math.random() > 0.5 ? amount * (0.2 + viewModel.level * 0.05) : -amount * (0.1 - viewModel.level * 0.01);
      viewModel.playerMoney += profit;
      viewModel.showMessage(`Invertiste $${amount}. ${profit > 0 ? 'Ganaste' : 'Perdiste'} $${Math.abs(profit.toFixed(2))}`);
      viewModel.set("currentTip", "Invertir puede ser arriesgado, pero también puede dar grandes recompensas.");
    } else {
      viewModel.showMessage("No tienes suficiente dinero para invertir.");
    }
  };

  viewModel.save = (amount) => {
    if (viewModel.playerMoney >= amount) {
      viewModel.playerMoney -= amount;
      const interest = amount * (0.05 + viewModel.level * 0.01);
      viewModel.playerMoney += interest;
      viewModel.showMessage(`Ahorraste $${amount}. Ganaste $${interest.toFixed(2)} de interés.`);
      viewModel.set("currentTip", "Ahorrar te ayuda a prepararte para el futuro y ganar intereses.");
    } else {
      viewModel.showMessage("No tienes suficiente dinero para ahorrar.");
    }
  };

  viewModel.spend = (amount) => {
    if (viewModel.playerMoney >= amount) {
      viewModel.playerMoney -= amount;
      viewModel.showMessage(`Gastaste $${amount} en diversión. ¡Te sientes feliz!`);
      viewModel.set("currentTip", "Está bien gastar en diversión, pero recuerda mantener un equilibrio.");
    } else {
      viewModel.showMessage("No tienes suficiente dinero para gastar.");
    }
  };

  viewModel.startBusiness = (amount) => {
    if (viewModel.playerMoney >= amount) {
      viewModel.playerMoney -= amount;
      const success = Math.random() > (0.7 - viewModel.level * 0.05);
      if (success) {
        const profit = amount * (2 + viewModel.level * 0.5);
        viewModel.playerMoney += profit;
        viewModel.showMessage(`¡Tu negocio fue un éxito! Ganaste $${profit}.`);
      } else {
        viewModel.showMessage("Tu negocio no tuvo éxito, pero aprendiste una valiosa lección.");
      }
      viewModel.set("currentTip", "Iniciar un negocio requiere planificación y puede ser arriesgado, pero también muy gratificante.");
    } else {
      viewModel.showMessage("No tienes suficiente dinero para iniciar un negocio.");
    }
  };

  viewModel.donate = (amount) => {
    if (viewModel.playerMoney >= amount) {
      viewModel.playerMoney -= amount;
      viewModel.showMessage(`Donaste $${amount} a la caridad. ¡Te sientes bien por ayudar a otros!`);
      viewModel.level += 0.1;
      viewModel.set("currentTip", "Donar ayuda a otros y te hace sentir bien. También puede traer beneficios inesperados.");
    } else {
      viewModel.showMessage("No tienes suficiente dinero para donar.");
    }
  };

  viewModel.study = (amount) => {
    if (viewModel.playerMoney >= amount) {
      viewModel.playerMoney -= amount;
      viewModel.level += 0.2;
      viewModel.showMessage(`Invertiste $${amount} en educación financiera. ¡Tu nivel de habilidad ha aumentado!`);
      viewModel.set("currentTip", "Aprender sobre finanzas te ayuda a tomar mejores decisiones con tu dinero.");
    } else {
      viewModel.showMessage("No tienes suficiente dinero para estudiar.");
    }
  };

  viewModel.onEndTurn = () => {
    viewModel.currentTurn++;
    if (viewModel.currentTurn > viewModel.maxTurns) {
      viewModel.endGame();
    } else {
      viewModel.triggerRandomEvent();
      viewModel.updateDatabase();
      viewModel.set("currentTip", educationalTips[Math.floor(Math.random() * educationalTips.length)]);
    }
  };

  viewModel.triggerRandomEvent = () => {
    const events = [
      { description: "¡Ganaste la lotería!", effect: () => viewModel.playerMoney += 500 },
      { description: "Tuviste que pagar impuestos.", effect: () => viewModel.playerMoney -= 100 },
      { description: "Recibiste un regalo de cumpleaños.", effect: () => viewModel.playerMoney += 50 },
      { description: "Tu bicicleta se rompió y tuviste que repararla.", effect: () => viewModel.playerMoney -= 30 },
      { description: "Encontraste dinero en la calle.", effect: () => viewModel.playerMoney += 20 },
      { description: "Tu inversión en tecnología dio frutos.", effect: () => viewModel.playerMoney += 150 },
      { description: "Tuviste que comprar libros escolares.", effect: () => viewModel.playerMoney -= 50 },
      { description: "Ganaste un concurso de matemáticas.", effect: () => viewModel.playerMoney += 100 }
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    event.effect();
    viewModel.set("lastEvent", `Evento aleatorio: ${event.description}`);
  };

  // ... (resto del código sin cambios)

  return viewModel;
}