const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const translate = new Translator();

const toBrit = ['Mangoes are my favorite fruit.', 'I ate yogurt for breakfast.', "We had a party at my friend's condo.", 
    'Can you toss this in the trashcan for me?', 'The parking lot was full.', 'To play hooky means to skip class or work.', 
    'No Mr. Bond, I expect you to die.', 'Dr. Grosh will see you now.', 'Lunch is at 12:15 today.', 'Like a high tech Rube Goldberg machine.']

const toBritOutput = ['Mangoes are my <span class="highlight">favourite</span> fruit.', 'I ate <span class="highlight">yoghurt</span> for breakfast.',
     "We had a party at my friend's <span class=\"highlight\">flat</span>.", 
    'Can you toss this in the <span class="highlight">bin</span> for me?', 'The <span class="highlight">car park</span> was full.', 
    'To <span class="highlight">bunk off</span> means to skip class or work.', 
    'No <span class="highlight">Mr</span> Bond, I expect you to die.', 
    '<span class="highlight">Dr</span> Grosh will see you now.', 'Lunch is at <span class="highlight">12.15</span> today.',
    'Like a high tech <span class="highlight">Heath Robinson device</span>.']

const toAmr = ['We watched the footie match for a while.', 'Paracetamol takes up to an hour to work.', 
    'First, caramelise the onions.', 'I spent the bank holiday at the funfair.', 'I had a bicky then went to the chippy.', 
    'I\'ve just got bits and bobs in my bum bag.', 'The car boot sale at Boxted Airfield was called off.', 
    'Have you met Mrs Kalyani?', 'Prof Joyner of King\'s College, London.', 'Tea time is usually around 4 or 4.30.'
]

const toAmrOutput = ['We watched the <span class="highlight">soccer</span> match for a while.', 
    '<span class="highlight">Tylenol</span> takes up to an hour to work.', 
    'First, <span class="highlight">caramelize</span> the onions.', 
    'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.', 
    'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.', 
    'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.', 
    'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.', 
    'Have you met <span class="highlight">Mrs.</span> Kalyani?', 
    '<span class="highlight">Prof.</span> Joyner of King\'s College, London.', 
    'Tea time is usually around 4 or <span class="highlight">4:30</span>.'
]

suite('Unit Tests', () => {
    suite ('American to British', function () {
        toBrit.forEach((item, index) => {
            test(`Translate ${item}`, (done) => {
                assert.isString(translate.americanToBritish(item))
                assert.strictEqual(translate.americanToBritish(item), toBritOutput[index])
                done();
            })
        })
    })
    suite ('British to American', function () {
        toAmr.forEach((item, index) => {
            test(`Translate ${item}`, (done) => {
                assert.isString(translate.britishToAmerican(item))
                assert.strictEqual(translate.britishToAmerican(item), toAmrOutput[index])
                done();
            })
        })
    })
    suite('Highlight Translation', function () {
        toBrit.forEach((item, index) => {
            test(`Translate ${item}`, (done) => {
                assert.isString(translate.americanToBritish(item))
                assert.strictEqual(translate.americanToBritish(item), toBritOutput[index])
                done();
            })
        })
    })
});
