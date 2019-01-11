const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
let json = [{
    "phase": "Entschuldigung!",
    "trans": "Excuse me. [as in may I have your attention]."
},
{
    "phase": "Sprechen Sie Englisch?",
    "trans": "Do you speak English?"
}]

jest
    .dontMock('fs');

describe('fetch list', function () {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        // restore the original func after test
        jest.resetModules();
        fetch.resetMocks();
    });

    it('get same items from json', function (done) {
        fetch.mockResponse(JSON.stringify(json))
        const {getItem} = require('../scripts/main.js');

        getItem().then(res => {
            expect(res).toEqual([{
                "phase": "Entschuldigung!",
                "trans": "Excuse me. [as in may I have your attention]."
            },
            {
                "phase": "Sprechen Sie Englisch?",
                "trans": "Do you speak English?"
            }])

            expect(res.length).toEqual(2);
            done();
        })
        .catch(err => console.log(err))
    });

    // it('show text if failure', function (done) {
    //     fetch.mockReject(new Error('Cannot found'));
    //     const {getItem} = require('../scripts/main.js');

    //     getItem()
    //     .catch(err => console.log(err))
    // });

});