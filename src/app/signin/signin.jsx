'use client';
import { useRouter } from 'next/navigation'
import { get, set } from '@/components/common/utils'
import '@/app/globals.css'

export function SignIn({captains}) {
/**
 * captains is array of {ghinNumber:   , lastName:} 
 */
  const router = useRouter();
  const lastName = get('lastName') ? get('lastName') : '';

function getCaptainObject(lastName){
  return captains.find(captain => captain.lastName === lastName)
}

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    let dataMode = 'ghin';
    if (!formJson.dataMode) dataMode = 'roster';
    const captain = getCaptainObject(formJson.lastName);
    if (captain !== undefined) {
      set('ghinNumber', captain.ghinNumber);
      set('lastName', captain.lastName);
      set('dataMode', dataMode);
      const path = `/fetchdata?ghinNumber=${captain.ghinNumber}&dataMode=${dataMode}`;
      router.push(path);
    } else {
      set('lastName', 'Invalid Last Name')
      window.location.reload();
    }
  }
	return ( 
		<section id='signin'>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<label>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name:&nbsp;&nbsp;
						<input
							type='text'
							name='lastName'
							defaultValue={lastName}              
							required
						/>
					</label>
					<button className={'button not-stacked'} type='submit'>
						Sign In
					</button>
					<label>
						<input type='checkbox' name='dataMode' defaultChecked />
						&nbsp;&nbsp;Fetch Data from GHIN
					</label>
				</fieldset>
			</form>
		</section>
	);
}
