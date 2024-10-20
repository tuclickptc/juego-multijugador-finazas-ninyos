import { createViewModel } from './results-view-model';

export function onNavigatingTo(args) {
  const page = args.object;
  page.bindingContext = createViewModel(page.navigationContext);
}