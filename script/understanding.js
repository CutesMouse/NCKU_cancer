function select(id) {
    document.querySelectorAll('.option')
        .forEach(element => element.classList.remove('selected'));

    let selected = (id === 0 ? '.option-small' : '.option-large');
    document.querySelector(selected).classList.add('selected');
    document.querySelectorAll('.understanding_button').forEach(item => item.remove());
    document.querySelectorAll('.next').forEach(item => item.classList.remove('hidden'));
}

function to_comparison() {
    if (document.querySelector('.selected') === null) {
        alert('請選擇選項！');
        return;
    }
    window.open('comparison_s1.html', "_self");
}