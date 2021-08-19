import { default as jMoment } from 'jalali-moment';
import moment from 'moment';
import 'moment-duration-format';

class DatePipe<T> {

  /** Phone Number Instructor **/
  constructor() { }

  /**
   * Convert Date To Moment format
   * @param {String} value
   * @param {String} format
   * @param {String} locale
   * @return {String}
   */
  public dateConvertor(value: string, format: string, locale: string = 'en'): string {
    return jMoment(value).locale(locale).format(format);
  }

  /**
   * Return a TimeAgo From Value To Now
   * @param {String} value
   * @return {String}
   */
  public timeAgo(value: string): string {
    return moment(value).fromNow();
  }

}

export { DatePipe };
