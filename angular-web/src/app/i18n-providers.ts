import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { Observable } from "rxjs/Rx";
export function getTranslationProviders(): Promise<Object[]> {
  let locale = localStorage.getItem('localeId');
  const noProviders: Object[] = [];
  if (!locale || locale === 'en') {
    return Promise.resolve(noProviders);
  }
  // Ex: 'locale/messages.fr.xlf`
  const translationFile = `./src/app/l10n/messages.${locale}.xlf`;
  var provider = getTranslationsWithSystemJs(translationFile)
    .then((translations: string) => [
      { provide: TRANSLATIONS, useValue: translations },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: locale }
    ])
    .catch(() => noProviders); // ignore if file not found

  debugger;
  return provider;
}
declare var System: any;
function getTranslationsWithSystemJs(file: string) {
// changes Start here 
  var text = "";
  var fileRequest = new XMLHttpRequest();
  fileRequest.open("GET", file, false);
  fileRequest.onerror = function (err) {
    console.log(err);
  }
  fileRequest.onreadystatechange = function () {
    if (fileRequest.readyState === 4) {
      if (fileRequest.status === 200 || fileRequest.status == 0) {
        text = fileRequest.responseText;
      }
    }
  }
  fileRequest.send()
  var observable = Observable.of(text);
  var prom = observable.toPromise();
  return prom; 
}