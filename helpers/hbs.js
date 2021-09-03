const moment = require('moment');

exports.formatDate = (date, format) => moment(date).format(format);

exports.formatStory = body => {
  const str = body.replace(/<(?:.|\n)*?>/gm, '').split(' ');

  if (str.length >= 50) {
    return `${str.slice(0, 50).join(' ')}....`;
  }

  return str.join(' ');
};

exports.editIcon = (storyUser, loggedUser, storyId, floating = true) => {
  if (storyUser._id.toString() === loggedUser._id.toString()) {
    if (!floating) {
      return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
    }

    return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue" ><i class="fas fa-edit fa-small"></i></a>`;
  }

  return '';
};

exports.select = (selected, options) => {
  return options
    .fn(this)
    .replace(new RegExp(`value="'${selected}'"`), '$& selected="selected"')
    .replace(new RegExp(`>${selected}</option>`), 'selected="selected"$&');
};
