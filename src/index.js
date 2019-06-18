import { Model } from './model';
import { View } from './view';
import { Controller } from './controller';

import './style.css';

function App() {
  const model = Model();
  const view = View();
  Controller({ model, view }).handleOnLoad();
}

window.addEventListener('DOMContentLoaded', () => {
  App();
});
