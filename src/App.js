import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'
//

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = e => {
    this.setState({website: e.target.value})
  }

  listenUserName = e => {
    this.setState({username: e.target.value})
  }

  listenPassword = e => {
    this.setState({password: e.target.value})
  }

  addContant = e => {
    e.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = ''
    const newValue = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      username: username,
      passwordValue: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValue],
      isTrue: true,
      website: '',
      username: '',
      password: '',
      searchInput: '',
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const castOf = latestList.length !== 0
    this.setState({latestList: newList, isTrue: castOf})
  }

  render() {
    const {isShow, latestList, website, username, password, searchInput} =
      this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="app-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="input-container">
          <form className="new-password-container" onSubmit={this.addContant}>
            <h1 className="discription">Add New Password</h1>
            <div className="website">
              <img
                className="website-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                alt="website"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                onChange={this.listenWebsite}
                value={website}
              />
            </div>
            <div className="website">
              <img
                className="website-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png  "
                alt="username"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter UserName"
                onChange={this.listenUserName}
                value={username}
              />
            </div>
            <div className="website">
              <img
                className="website-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                alt="password"
              />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                value={password}
                onChange={this.listenPassword}
              />
            </div>
            <button className="button" type="submit">
              Add
            </button>
          </form>
          <div>
            <img
              className="password-manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
          </div>
        </div>

        <div className="no-password-container">
          <div className="password-container">
            <div className="your-password">
              <h1>Your Passwords</h1>
              <p className="count">{newList.length}</p>
            </div>
            <div className="search">
              <img
                className="website-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png  "
                alt="search"
              />
              <input
                type="search"
                className="input-element"
                placeholder="search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <div>
            <hr />
          </div>
          <div className="checked-container">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="checked">
              Show passwords
            </label>
          </div>
          {!isTrue && (
            <div className="on-image">
              <img
                src=" https://assets.ccbp.in/frontend/react-js/no-passwords-img.png  "
                alt="no passwords"
                className="nopassword-image"
              />
              <p>No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul>
              {newList.map(eachItem => (
                <li id={eachItem.id} key={eachItem.id}>
                  <p>{eachItem.initialValue}</p>
                  <div>
                    <p>{eachItem.websiteName}</p>
                    <p>{eachItem.username}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isShow && <p>{eachItem.passwordValue}</p>}
                  </div>
                  <button
                    className="button"
                    data-testid="delete"
                    onClick={() => this.deleteItem(eachItem.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
