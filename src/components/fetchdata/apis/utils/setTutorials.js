import { set } from '@/components/common/utils';

export default function setTutorials(values) {
  let tutorials = [];
  let tutorialsArray = values;
  tutorialsArray.shift();
  tutorialsArray.forEach(createTutorialsObject);

  function createTutorialsObject(item) {
    let tutorialsObject = { title: item[0], link: item[1] };
    tutorials.push(tutorialsObject);
  }

  set('tutorials', tutorials);
}
