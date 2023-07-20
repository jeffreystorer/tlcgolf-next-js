export default function NotLoggedInLayout({ children }) {
  return (
    <>
      <header id='headernotloggedin'>
        <h1>TLC Golf</h1>
        <br />
        <br />
      </header>
      <main>{children}</main>
    </>
  );
}
