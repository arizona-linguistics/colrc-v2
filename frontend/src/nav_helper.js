import {$,jquery} from 'jquery';
import 'jquery-ui';
// export for others scripts to use
window.$ = $;
window.jQuery = jquery;

$('.menu-toggle').click(function() {

  $('.site-nav').toggleClass('site-nav--open', 500);
  $(this).toggleClass('open');

});
