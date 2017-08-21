/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { assert } from '@ember/debug';
import BaseHelper from './-format-base';

export function getValue([translations]) {
  assert('[ember-intl] no translation string provided to format-html-message.', translations);

  return translations;
}

export default BaseHelper.extend({
  getValue,
  helperType: 'format-html-message',

  format(value, options) {
    return this.intl.formatHtmlMessage(value, options);
  }
});
