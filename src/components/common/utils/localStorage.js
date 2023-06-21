'use client';

export const get = (item) => {
  try {
    const storedItem = window.localStorage.getItem(item);
    if (storedItem === null) {
      return undefined;
    }
    return JSON.parse(storedItem);
  } catch (err) {
    return undefined;
  }
};

export const set = (item, value) => {
  try {
    const valueToBeStored = JSON.stringify(value);
    window.localStorage.setItem(item, valueToBeStored);
  } catch (err) {
    console.log(' error: ' + err + ' storing item: ' + item);
  }
};

export const remove = (item) => {
  try {
    window.localStorage.removeItem(item);
  } catch (err) {
    console.log(' error: ' + err + ' removing item: ' + item);
  }
};

export const clear = () => {
  window.localStorage.clear();
};
