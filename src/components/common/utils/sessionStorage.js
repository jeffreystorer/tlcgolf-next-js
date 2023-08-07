'use client';

export const sget = (item) => {
  try {
    const storedItem = window.sessionStorage.getItem(item);
    if (storedItem === null) {
      return undefined;
    }
    return JSON.parse(storedItem);
  } catch (err) {
    return undefined;
  }
};

export const sset = (item, value) => {
  try {
    const valueToBeStored = JSON.stringify(value);
    window.sessionStorage.setItem(item, valueToBeStored);
  } catch (err) {
    console.log(' error: ' + err + ' storing item: ' + item);
  }
};

export const sremove = (item) => {
  try {
    window.sessionStorage.removeItem(item);
  } catch (err) {
    console.log(' error: ' + err + ' removing item: ' + item);
  }
};

export const sclear = () => {
  window.sessionStorage.clear();
};
