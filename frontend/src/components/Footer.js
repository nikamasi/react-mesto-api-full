function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
