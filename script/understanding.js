function select(id) {
    document.querySelectorAll('.option')
        .forEach(element => element.classList.remove('selected'));

    let selected = (id === 0 ? '.option-small' : '.option-large');
    document.querySelector(selected).classList.add('selected');
}