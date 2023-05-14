const toggleDisplay = (selector, value) => selector.style.display = value;
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countries: [] };
  }

  async componentDidMount() {
    const responseJSON = await fetch('https://restcountries.com/v2/all?fields=alpha2Code,flag,name,capital,population');
    const response = await responseJSON.json()
    this.setState({ countries: response });
  }

  handleNavClick = async e => {
    e.preventDefault();
    const contentElem = document.querySelector('.content');
    contentElem.querySelectorAll('h2, h4, ul').forEach(item => {
      item.innerHTML = '';
    });
    toggleDisplay(document.querySelector('#preloader'), 'block');

    const dataCode = e.target.getAttribute('data-code');
    const responseCode = await fetch('https://restcountries.com/v2/alpha/' + dataCode);
    const dataCountry = await responseCode.json();

    contentElem.querySelector('h2').innerText = dataCountry.name;
    contentElem.querySelector('h4').innerText = 'Столица: ' + (dataCountry.capital || 'Нет');

    const responseBorders = await fetch('https://restcountries.com/v2/name/' + dataCountry.name);
    const dataBorders = await responseBorders.json();

    try {
      const borderCodeFullNames = await Promise.all(dataBorders[0].borders.map(async border => {
        const responseBorderCode = await fetch('https://restcountries.com/v2/alpha/' + border);
        return await responseBorderCode.json();
      }));

      contentElem.querySelector('ul').innerHTML = '<strong>Граничит с:</strong>';

      borderCodeFullNames.forEach(borderCodeFullName => {
        const li = document.createElement('li');
        li.innerText = borderCodeFullName.name;
        contentElem.querySelector('ul').append(li);
      });
    } catch (e) {
      console.error(e);
    }

    contentElem.querySelector('img').setAttribute('src', dataBorders[0].flag);
    toggleDisplay(document.querySelector('#preloader'), 'none');
  }

  render() {
    return (
      <aside>
        <nav className="aside__nav" onClick={this.handleNavClick}>
          {
            this.state.countries.map((country) => (
              <a href="#" key={country.alpha2Code} data-code={country.alpha2Code} className="aside__nav__a">{country.name}</a>
            ))
          }
        </nav>
      </aside>
    );
  }
}