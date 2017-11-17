import { ProtoGamePage } from './app.po';

describe('proto-game App', () => {
  let page: ProtoGamePage;

  beforeEach(() => {
    page = new ProtoGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('proto works!');
  });
});
