import { browser, element, by } from 'protractor';

export class ProtoGamePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('proto-root h1')).getText();
  }
}
