const getDataTestIdSelector = dataTestId => `[data-testid="${dataTestId}"]`

describe('Login', () => {
  beforeEach(async () => {
    console.log('beforeEach do teste');
    await page.goto(BASE_URL)
  })

  describe('JOIN', () => {

    it.only('shows error message when no room is found', async () => {
      console.log('preenchendo name');
      await page.type(getDataTestIdSelector('join-name'), 'John Doe')
      console.log('preenchendo room');
      await page.type(getDataTestIdSelector('join-roomId'), 'not existent room')
      console.log('clicando JOIN');
      await page.click(getDataTestIdSelector('join-joinButton'))
      console.log('esperando \'JOIN\'');
      await page.waitForSelector(getDataTestIdSelector('dialog-not-found-error'))
    })

    it('should redirect to games page when a game is found', async () => {
      console.log('preenchendo name');
      await page.type(getDataTestIdSelector('join-name'), 'John Doe')
      console.log('preenchendo room');
      await page.type(getDataTestIdSelector('join-roomId'), 'teste')
      console.log('clicando JOIN');
      await page.click(getDataTestIdSelector('join-joinButton'))
      console.log('esperando \'JOIN\'');
      await expect(page).toHaveURL(/.*teste/);
    })

  })

  describe('JOIN', () => {

    it('should redirect to games page when a game is created', async () => {
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
