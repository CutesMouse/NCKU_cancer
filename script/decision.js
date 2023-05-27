function update_checkbox() {
    document.querySelectorAll('.checkbox').forEach(element => {
        if (element.getAttribute('checked') === "true") element.setAttribute('pref', "☑");
        else element.setAttribute('pref', "☐");
    });
}

document.addEventListener('DOMContentLoaded', function () {
    update_checkbox();
}, false);

function check(id) {
    document.querySelectorAll('.checkbox')
        .forEach(item => item.setAttribute('checked', "false"));
    document.querySelector('#cb' + id).setAttribute('checked',"true");
    if (id === 2) {
        document.querySelector('.multiple_element').classList.remove('hidden');
    }
    else document.querySelector('.multiple_element').classList.add('hidden');
    update_checkbox();
}

function children_check(id) {
    document.querySelectorAll('.child')
        .forEach(item => item.setAttribute('checked', "false"));
    document.querySelector('#cb' + id).setAttribute('checked',"true");
    update_checkbox();
}

function submit() {
    if (document.querySelector('.checkbox[checked="true"]') == null) {
        alert('請選擇選項!');
        return;
    }
    window.open('more_info.html', '_self')
}