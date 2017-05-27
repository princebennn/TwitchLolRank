import { TwitchlolrankPage } from './app.po';

describe('twitchlolrank App', function() {
  let page: TwitchlolrankPage;

  beforeEach(() => {
    page = new TwitchlolrankPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
