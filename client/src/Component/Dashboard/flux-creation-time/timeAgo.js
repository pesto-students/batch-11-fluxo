const timeAgo = (function() {
  const self = {};

  self.locales = {
    prefix: '',
    sufix: 'ago',

    seconds: 'less than a minute',
    minute: 'about a minute',
    minutes: '%d minutes',
    hour: 'about an hour',
    hours: 'about %d hours',
    day: 'a day',
    days: '%d days',
    month: 'about a month',
    months: '%d months',
    year: 'about a year',
    years: '%d years',
  };

  self.inWords = function(timeAgo) {
    var seconds = Math.floor((new Date() - parseInt(timeAgo)) / 1000),
      separator = this.locales.separator || ' ',
      words = this.locales.prefix + separator,
      interval = 0,
      intervals = {
        year: seconds / 31536000,
        month: seconds / 2592000,
        day: seconds / 86400,
        hour: seconds / 3600,
        minute: seconds / 60,
      };

    var distance = this.locales.seconds;

    for (var key in intervals) {
      interval = Math.floor(intervals[key]);

      if (interval > 1) {
        distance = this.locales[key + 's'];
        break;
      } else if (interval === 1) {
        distance = this.locales[key];
        break;
      }
    }

    distance = distance.replace(/%d/i, interval);
    words += distance + separator + this.locales.sufix;

    return words.trim();
  };

  return self;
})();

export { timeAgo };
