import { AngularWebPage } from './app.po';

describe('angular-web App', () => {
  let page: AngularWebPage;

  beforeEach(() => {
    page = new AngularWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
