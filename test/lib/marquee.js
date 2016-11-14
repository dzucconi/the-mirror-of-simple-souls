import Marquee from '../../app/javascripts/lib/marquee';

describe('Marquee', () => {
  describe('cursor', () => {
    it('fast forwards to the specified cursor', () => {
      const marquee = new Marquee({
        messages: ['first', 'second', 'third', 'fourth', 'fifth'],
        cursor: 2,
      });

      marquee.peek()
        .should.equal('third');

      marquee.messages
        .should.eql([
          'third',
          'fourth',
          'fifth',
          'first',
          'second',
        ]);
    });

    it('does the right thing when out of bounds', () => {
      const marquee = new Marquee({
        messages: ['first', 'second', 'third', 'fourth', 'fifth'],
        cursor: 20,
      });

      marquee.peek()
        .should.equal('first');

      marquee.messages
        .should.eql([
          'first',
          'second',
          'third',
          'fourth',
          'fifth',
        ]);
    });
  });
});
