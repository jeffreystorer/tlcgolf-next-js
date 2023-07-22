'use client';
import { usePathname } from 'next/navigation';
export default function ConfirmDeleteModal() {
  const pathname = usePathname();

  return (
    <div id='confirmdeletemodal'>
      <a href={pathname} className='modalClose' hidden></a>
      <section>
        <header>
          <h2>Heads up!</h2>
          <a href={pathname} className='modalClose' hidden></a>
        </header>
        <p>Are you sure you want to delete?</p>
        <footer>
          <a type='button' className='modalClose' href={pathname}>
            Cancel
          </a>
          <button className='not_stacked'>Delete</button>
        </footer>
      </section>
    </div>
  );
}
