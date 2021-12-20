import moment from 'moment';

export function checkItemFromLocalStorage(key) {
    console.log('Checking item from local storage');
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
        console.log('Item not found');
        return null;
    }

    console.log('Item found');
    const item = JSON.parse(itemStr);
    return item;
}

export function setItemToLocalStorage(key, value) {
    if (key && value) {
        console.log('Saving item to local storage');

        const item = JSON.stringify(value);
        localStorage.setItem(key, item);
    } else {
        console.log('Error saving item to local storage');
    }
}

export function fromNow(date) {
    return moment(date).fromNow();
}

export function isNotEmptyArray(array) {
    return array.length > 0 ? array : false;
}

export function toTitleCase(string) {
    if (string) {
        let sentence = string.toLowerCase().split(' ');
        sentence.forEach((word, index) => {
            sentence[index] =
                word[index][0].toUpperCase() + word[index].slice(1);
        });
        sentence.join(' ');
        return sentence;
    }
    return;
}
