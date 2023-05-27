// 判斷有沒有包含順序
let URL = document.URL;
if (!URL.includes('?care=')) {
    window.open('comparison_s1.html', '_self')
}
let order = URL.split('?care=')[1];
let content = [];
for (let i = 0; i < order.length; i++) {
    let item = "";
    switch (order[i]) {
        case 'f':
            item = "fee";
            break;
        case 'e':
            item = "effect";
            break;
        case 's':
            item = "side-effect";
            break;
    }
    content.push(item);
}


document.addEventListener('DOMContentLoaded', function() {
    content.forEach(item => document.querySelector('#' + item).classList.remove('hidden'))
}, false);

//calc
function calc_money() {
    let fee = parseInt(document.querySelector('#a').value) * parseInt(document.querySelector('#b').value);
    document.querySelector('#fee_result').innerHTML = "費用: " + fee;
}

function select(title, id) {
    document.querySelectorAll('#' + title +' .option')
        .forEach(element => element.classList.remove('selected'));

    let selected = '#' + title +' .option' + (id === 0 ? '.option-small' : '.option-large');
    document.querySelector(selected).classList.add('selected');
}

function submit() {
    //確認填寫狀況
    let valid = true;
    let data = [];
    let not_yet = undefined;
    let dictionary = {
        "fee": "費用",
        "effect": "療效",
        "side-effect": "副作用"
    }
    content.forEach(item => {
        let select = document.querySelector('#' + item + " " + ".selected");
        if (select == null) {
            valid = false;
            not_yet = dictionary[item];
            return;
        }
        let option = select.classList.contains('option-large') ? 1 : 0;
        data.push(item + "=" + option);
    });
    if (valid) {
        window.open('comparison_s3.html?'+data.join('&'), '_self');
    } else {
        alert('您尚未填寫 ' + not_yet);
    }
}