export default function NotLoggedInLayout({ children }) {
  return (
    <>
      <header id='header_not-signed-in'>
        <h1>TLC Golf</h1>
      </header>
      <main>{children}</main>
    </>
  );
}
