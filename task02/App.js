class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <hr />
        <article>
          <Sidebar />
          <Content />
        </article>
        <Footer />
      </div>
    );
  }
}

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(<App />);