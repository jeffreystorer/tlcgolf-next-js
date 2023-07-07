import { TUTORIALS_URL } from '@/components/fetchdata/apis/constants';
import { setTutorials } from '@/components/fetchdata/apis/utils';

async function getTutorialsData() {
  const res = await fetch(TUTORIALS_URL, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch tutorialsData');
  }

  return res.json();
}

export default async function TutorialsPage() {
  const message1 = searchParams.message1;
  const message2 = searchParams.message2;
  const tutorialsData = await getTutorialsData();
  const tutorials = setTutorials(tutorialsData.values);

  const tutorialList = tutorials.map((tutorial) => {
    return (
      <>
        <h2>{tutorial.title}</h2>
        <iframe
          src={tutorial.link + '?skipIntro=true'}
          width='640'
          height='640'
          frameBorder='0'
          title={tutorial.title}></iframe>
      </>
    );
  });

  return (
    <>
      {tutorialList}
    </>
  );
}
