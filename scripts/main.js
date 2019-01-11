function setItems(data) {
    if (data.length === 0) {
        return false;
    }

    const grid = document.getElementById('language');
    data.forEach(item => {
        //get data and create a list of phases
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="lang-grid--item">
                <h2 class="lang-grid--title">${item.phase}</h2>
                <p class="lang-grid--trans">${item.trans}</p>
            </div>
        `;
        grid.appendChild(div);
    })
}

const getItem = () => fetch("./language.json")
        .then(res => res.json())
        .then(json => {
            setItems(json);
            return json;
        })
        .catch(err => document.querySelector('.lang-grid__nodata').classList.remove('hide'));

const triggerItem = () => {
    const list = document.querySelectorAll('.lang-grid--trans');
    list.forEach(function (item) {
        if (item.classList.contains('hide')) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    })
}

getItem();
document.getElementById('disable').addEventListener('click', triggerItem);

if (typeof exports !== 'undefined') {
    module.exports = {
        getItem,
        setItems,
        triggerItem
    };
}