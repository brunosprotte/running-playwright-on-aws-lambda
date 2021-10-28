const getDataTestIdSelector = dataTestId => `[data-testid="${dataTestId}"]`

describe('Poker E2E', () => {
  beforeEach(async () => {
    await page.goto(BASE_URL)
  })

  describe('Joining a game', () => {

    it('shows error message when no room is found', async () => {
      await page.fill(`${getDataTestIdSelector('join-name')} input`, 'John Doe')
      await page.fill(`${getDataTestIdSelector('join-roomId')} input`,  'not existent room')
      
      const [click, dialog] = await Promise.all([
        page.click(getDataTestIdSelector('join-joinButton')),
        page.waitForSelector(getDataTestIdSelector('dialog-not-found-error-text'), {timeout:10000})
      ])

      await expect(dialog).toHaveText("Room not found!");
    })

    it('should redirect to games page when a game is found', async () => {
      await page.fill(`${getDataTestIdSelector('join-name')} input`, 'John Doe')
      
      await page.fill(`${getDataTestIdSelector('join-roomId')} input`, 'teste')
      
      await Promise.all([
        page.click(getDataTestIdSelector('join-joinButton')),
        page.waitForURL(/.*teste/, { timeout:10000, waitUntil: "domcontentloaded" })  
      ]);
      
      expect(page.url()).toContain('/teste')
    })
  })

  describe('Creating a game', () => {

    it('should redirect to games page when a game is created', async () => {
      await page.fill(`${getDataTestIdSelector('create-name')} input`, 'John Doe')
      await page.fill(`${getDataTestIdSelector('create-roomName')} input`, 'testeCreate')
      await page.click('#create-gameType');
      await page.click('#create-gameType-t-shirt');
      
      await Promise.all([
        page.click(getDataTestIdSelector('create-createButton')),
        page.waitForURL(/.*room/, { timeout:10000, waitUntil: "domcontentloaded" })  
      ]);

      expect(page.url()).toContain('/room')
    })

    describe('Playing a match with created game data', () => {

      describe('Selecting a card', () => {
    
        it('should displays a card at the table when the player selects a card', async () => {
          
          const [click, card] = await Promise.all([
            page.click(getDataTestIdSelector('hand-card-item-8')),
            page.waitForSelector(getDataTestIdSelector('played-card-value-John Doe'), {timeout:10000})
          ])
          expect(card).toBeVisible();
          await expect(card).toBeVisible();
        });
    
      });
    
    });

  }); 
  
});


