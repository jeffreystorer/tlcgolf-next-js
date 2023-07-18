import { TutorialsDynamic } from '@/app/(home)/tutorials/tutorialsdynamic';
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

export default async function Page() {
  const tutorialsData = await getTutorialsData();
  const tutorialValues = setTutorials(tutorialsData.values);

  const tutorialList = tutorialValues.map((tutorial) => {
    return (
      <>
        <h2>{tutorial.title}</h2>
        <div className='iframe'>
          <iframe
            src={tutorial.link + '?skipIntro=true'}
            width='640'
            height='360'
            frameBorder='0'
            title={tutorial.title}></iframe>
        </div>
      </>
    );
  });

  return <TutorialsDynamic tutorialList={tutorialList} />;
}
