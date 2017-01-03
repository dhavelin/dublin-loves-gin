import { DublinLovesGinPage } from './app.po';

describe('dublin-loves-gin App', function() {
  let page: DublinLovesGinPage;

  beforeEach(() => {
    page = new DublinLovesGinPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
