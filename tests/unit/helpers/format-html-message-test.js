import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import formatHtmlHelper from 'ember-intl/helpers/format-html-message';
import expectError from '../../helpers/expect-error';

moduleForComponent('format-html-message', {
  integration: true,
  beforeEach() {
    this.inject.service('intl');
    this.intl.addTranslations('en-us', { foo: { bar: 'foo bar baz', baz: 'baz baz baz' } });
    this.intl.setLocale('en-us');
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(formatHtmlHelper);
});

test('invoke the formatHTMLMessage directly', function(assert) {
  assert.expect(1);
  assert.equal(
    this.intl.formatHtmlMessage('<strong>Hello {name} {count, number}</strong>', {
      name: '<em>Jason</em>',
      count: 42000
    }).string,
    '<strong>Hello &lt;em&gt;Jason&lt;/em&gt; 42,000</strong>'
  );
});

test('invoke the formatHTMLMessage directly with inlined locale', function(assert) {
  assert.expect(1);

  let output = this.intl.formatHtmlMessage('<strong>Hello {name} {count, number}</strong>', {
    name: '<em>Jason</em>',
    count: 42000,
    locale: 'fr-fr'
  }).string;

  assert.equal(
    escape(output),
    '%3Cstrong%3EHello%20%26lt%3Bem%26gt%3BJason%26lt%3B/em%26gt%3B%2042%A0000%3C/strong%3E'
  );
});

test('message is formatted correctly with argument', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-html-message 'Hello {name}' name="Jason"}}`);
  assert.equal(this.$().text(), 'Hello Jason');
});

test('should throw if called with out a value', function(assert) {
  assert.expect(1);

  expectError(
    () => this.render(hbs`{{format-html-message}}`),
    ex => {
      assert.ok(
        ex.message.match(/Assertion Failed: \[ember-intl\] no translation string provided to format-html-message\./)
      );
    }
  );
});

test('should allow for inlined html in the value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-html-message '<strong>Hello {name}</strong>' name='Jason'}}`);
  assert.equal(this.$().html(), '<strong>Hello Jason</strong>');
});

test('should escape arguments', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-html-message '{foo}' foo="<em>BAR</em>"}}`);
  assert.equal(this.$().html(), '&lt;em&gt;BAR&lt;/em&gt;');
});

test('should allow for inlined html in the value but escape arguments', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-html-message '<strong>Hello {name}</strong>' name='<em>Jason</em>'}}`);
  assert.equal(this.$().html(), '<strong>Hello &lt;em&gt;Jason&lt;/em&gt;</strong>');
});
