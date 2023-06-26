// 判斷有沒有包含順序
let URL = document.URL;
if (!URL.includes('?care=')) {
    window.open('comparison_s1.html', '_self')
}
let order = URL.split('?care=')[1];
let content = [];
let form = {
    "fee": undefined,
    "effect": undefined,
    "side-effect": undefined
}
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
    content.forEach(item => document.querySelector('#' + item).classList.remove('hidden'));
    content.forEach(item => document.querySelector('.' + item + "-img").addEventListener('click', function(e) {
        let p_w = e.offsetX / document.querySelector('.' + item + "-img").width;
        let p_h = e.offsetY / document.querySelector('.' + item + "-img").height;
        switch (item) {
            case 'fee':
                if (p_w >= 0.156 && p_w <= 0.5) select(item, 0);
                if (p_w > 0.5) select(item, 1);
                break;
            case 'effect':
                if (p_w >= 0.202 && p_w <= 0.505 && p_h >= 0.304) select(item, 0);
                if (p_w >= 0.575 && p_w <= 0.89 && p_h >= 0.235) select(item, 1);
                break;
            case 'side-effect':
                if (p_w >= 0.489 && p_w <= 0.713) select(item, 0);
                if (p_w > 0.713) select(item, 1);
                break;
        }
    }))
}, false);

//calc
function calc_money() {
    let fee = parseInt(document.querySelector('#a').value) * parseInt(document.querySelector('#b').value);
    document.querySelector('#fee_result').innerHTML = "費用: " + fee;
}

function select(title, id) {
    form[title] = id;
    if (title === 'side-effect') {
        document.querySelector('.side-effect-img').setAttribute('src', 'resources/comparison/determine/side_effect_table_sel'+id+'.png')
    }
    document.querySelectorAll('.' + title +'-img')
        .forEach(element => element.classList.remove(title+'-img-sel0', title + '-img-sel1'));

    document.querySelector('.' + title +'-img').classList.add(title + '-img-sel' + id);
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
        let select = form[item];
        if (select === undefined) {
            valid = false;
            not_yet = dictionary[item];
            return;
        }
        data.push(item + "=" + select);
    });
    if (valid) {
        window.open('comparison_s3.html?'+data.join('&'), '_self');
    } else {
        alert('您尚未填寫 ' + not_yet);
    }
}