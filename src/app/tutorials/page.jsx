import React from 'react';
import { get } from '@/components/common/utils';

export default function TutorialsPage() {
  const tutorials = get('tutorials');
  const tutorialList = tutorials.map((tutorial) => {
    return (
      <>
        <div className='div--center'>
          <heading className='tutorial--title'>{tutorial.title}</heading>
        </div>
        <div className='div--center'>
          <iframe
            src={tutorial.link + '?skipIntro=true'}
            width='640'
            height='640'
            frameBorder='0'
            title={tutorial.title}></iframe>
        </div>
      </>
    );
  });

  return <>{tutorialList}</>;
}
