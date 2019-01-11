const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

jest
.dontMock('fs');

describe('phase list', function () {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        
    });

    afterEach(() => {
        // restore the original func after test
        jest.resetModules();
    });

    it('list grid exists', function () {
        expect(document.getElementById('language')).toBeTruthy();
    });

    it('create list items', function () {
        const {setItems} = require('../scripts/main.js');
        const json = [{
            "phase": "Entschuldigung!",
            "trans": "Excuse me. [as in may I have your attention]."
        },
        {
            "phase": "Sprechen Sie Englisch?",
            "trans": "Do you speak English?"
        }];

        setItems(json);
        expect(document.querySelectorAll('.lang-grid--item').length).toEqual(2);
        expect(document.querySelector('.lang-grid--item')).toBeTruthy();
    });

    it('hide item when clicked button', function () {
        const {setItems, triggerItem} = require('../scripts/main.js');
        const json = [{
            "phase": "Entschuldigung!",
            "trans": "Excuse me. [as in may I have your attention]."
        },
        {
            "phase": "Sprechen Sie Englisch?",
            "trans": "Do you speak English?"
        }];

        setItems(json);
        document.getElementById('disable').addEventListener('click', triggerItem);

        document.getElementById('disable').click();
        expect(document.querySelector('.lang-grid--trans:nth-of-type(1)').classList.contains('hide')).toBeTruthy();

        document.getElementById('disable').click();
        expect(document.querySelector('.lang-grid--trans:nth-of-type(1)').classList.contains('hide')).toBeFalsy();
    });

    it('stop func if no items', function () {
        const {setItems} = require('../scripts/main.js');
        const json = [];
        expect(setItems(json)).toBeFalsy();
    });

});