import { VideoPortfolioAppPage } from './app.po';

describe('video-portfolio-app App', function() {
  let page: VideoPortfolioAppPage;

  beforeEach(() => {
    page = new VideoPortfolioAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
