
import '@pnotify/core/dist/PNotify.css'
import '@pnotify/mobile/dist/PNotifyMobile.css'
import '@pnotify/core/dist/BrightTheme.css'
import { error, notice, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

  defaultModules.set(PNotifyMobile, {});

  function notFoundNotice(){
    notice({
      text: 'No results were found. Please enter another name',
      delay: 5000,
      animation: 'fade',
      maxTextHeight: null
    })
  }

  function someError(){
    error({
      text: 'Somthing happened. Make one more try',
      delay: 5000,
      animation: 'fade',
      maxTextHeight: null
    })
  }

  export {notFoundNotice, someError}
