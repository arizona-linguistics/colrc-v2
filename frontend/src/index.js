import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import 'semantic-ui-css/semantic.min.css';
import "semantic-ui-css/semantic.css";
import Colrc from './Colrc';
import registerServiceWorker from './registerServiceWorker';
// import {$,jQuery} from 'jquery';
// // export for others scripts to use
// window.$ = $;
// window.jQuery = jQuery;

ReactDOM.render(<Colrc />, document.getElementById('root'));
registerServiceWorker();
