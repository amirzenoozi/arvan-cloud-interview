import { DatePipe } from './date.pipe';

const SampleDate = 'Mon, 04 Jan 2021 13:55:26 GMT';

describe('MomentJs Test', () => {
  it('Test Date Format => "YYYY MMM DD"', () => {
    const Moment = new DatePipe();
    expect(Moment.dateConvertor(SampleDate, 'YYYY MMM DD')).toEqual(
        '2021 Jan 04'
    );
  });

  it('Test Date Format => "MMMM"', () => {
    const Moment = new DatePipe();
    expect(Moment.dateConvertor(SampleDate, 'MMMM')).toEqual('January');
  });
});
