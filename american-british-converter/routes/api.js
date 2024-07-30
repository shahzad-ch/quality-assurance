'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const text = req.body.text
      const locale = req.body.locale
      if (text == '') {
        return res.send({ error: 'No text to translate' })
      }
      if (!locale || !text) {
        return res.send({ error: 'Required field(s) missing' })
      }

      let translation = ''
      if (locale == 'american-to-british') {
        translation = translator.americanToBritish(text)
      }
      else if (locale == 'british-to-american') {
        translation = translator.britishToAmerican(text)
      } else {
        return res.send({ error: 'Invalid value for locale field' })
      }


      if (text === translation) {
        translation = 'Everything looks good to me!'
      }

      translation = translation[0].toUpperCase() + translation.slice(1)
      // console.log(translation)
      res.send({ text, translation })
    });
};
