// 判斷有沒有包含順序
let URL = document.URL;
if (!URL.includes('?care=')) {
    window.open('comparison_s1.html', '_self')
}
let order = URL.split('?care=')[1].split('&')[0];
let data_saved = URL.includes('&') ? URL.substring(URL.indexOf('&')) : '';
let item;
let sel = undefined;

switch (order[0]) {
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
order = order.substring(1);


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#' + item).classList.remove('hidden');
    document.querySelector('.' + item + "-img").addEventListener('click', function (e) {
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
    });
}, false);

//calc
function calc_money() {
    let fee = parseInt(document.querySelector('#a').value) * parseInt(document.querySelector('#b').value);
    document.querySelector('#fee_result').innerHTML = "費用: " + fee;
}

function select(title, id) {
    document.querySelectorAll('.click_hint').forEach(i => i.remove());
    sel = id;
    if (title === 'side-effect') {
        document.querySelector('.side-effect-img').setAttribute('src', 'resources/comparison/determine/side_effect_table_sel' + id + '.png')
    }
    document.querySelectorAll('.' + title + '-img')
        .forEach(element => element.classList.remove(title + '-img-sel0', title + '-img-sel1'));

    document.querySelector('.' + title + '-img').classList.add(title + '-img-sel' + id);
}

function submit() {
    //確認填寫狀況
    if (sel === undefined) {
        alert('請進行選擇！');
        return;
    }
    data_saved += "&" + item + "=" + sel;
    if (order.length === 0) {
        window.open('comparison_s3.html?' + data_saved.substring(1), '_self');
        return;
    }
    window.open('comparison_s2.html?care=' + order + data_saved, '_self');
}