test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }
callback('peanut butter')
});

//   it('works with resolves', async () => {
//     const bot = new autobot();
//     console.log(bot.board)
//     await expect(bot.run.toEqual({ result: 'correct' }))
//   });
