const getDataTestIdSelector = dataTestId => `[data-testid="${dataTestId}"]`

describe('Login', () => {
  beforeEach(async () => {
    console.log('beforeEach do teste');
    await page.goto(BASE_URL)
  })

  describe('JOIN', () => {

    it('shows error message when no room is found', async () => {
      console.log('preenchendo name');
      await page.type(getDataTestIdSelector('join-name'), 'John Doe')
      console.log('preenchendo room');
      await page.type(getDataTestIdSelector('join-roomId'), 'not existent room')
      console.log('clicando JOIN');
      await page.click(getDataTestIdSelector('join-joinButton'))
      console.log('esperando \'JOIN\'');
      const dialog = await page.waitForSelector(getDataTestIdSelector('dialog-not-found-error-text'));
      console.log('dialog', dialog)
    })

    test.only('should redirect to games page when a game is found', async () => {
      await page.fill('#join-name', 'John Doe')
      
      await page.fill('#join-roomId', 'teste')
      
      await Promise.all([
        page.click('#join-joinButton'),
        page.waitForURL(/.*teste/, { timeout:30000, waitUntil: "domcontentloaded" })  
      ]);
      
      expect(page.url()).toContain('/teste')
    })

  })

  describe('CREATE', () => {

    it('should redirect to games page when a game is created', async ({page}) => {
      console.log('preenchendo name');
      await page.type(getDataTestIdSelector('create-name'), 'John Doe')
      console.log('preenchendo room');
      await page.type(getDataTestIdSelector('create-roomName'), 'testeCreate')
      console.log('preenchendo gameType');
      await page.selectOption(getDataTestIdSelector('create-gameType'), 'T-shirt');
      console.log('clicando \'CREATE\'');
      await page.click(getDataTestIdSelector('create-createButton'))
      await expect(page).toHaveURL(/.*testeCreate/);
    })

  });


  it('successful login', async () => {
    await page.type(getDataTestIdSelector('email'), 'someuser@gmail.com')
    await page.type(getDataTestIdSelector('senha'), 'somepass')
    await page.click(getDataTestIdSelector('entrar'))

    await page.waitForSelector(getDataTestIdSelector('logout'))

    const url = await page.url()
    expect(url).toContain('/admin/home')
  })
})
