import './App.css';
import Particles from 'react-particles-js';
import Navigation from '../../components/Navigation/Navigation';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import Rank from '../../components/Rank/Rank';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';
import Signin from '../../components/Signin/Signin';
import Register from '../../components/Register/Register';
import { connect } from 'react-redux';
import { buttonSubmit, addingFaceBox, userAuthorization, userLogout, updateUser, incorrectData, userRegistration, leaveRegistration } from '../../actions';
import { Route, Switch } from 'react-router-dom';
import { store } from '../../index';

const calculateFaceLocation = (data) => {
  const clarifai_box = data.outputs[0].data.regions[0].region_info.bounding_box;
  const img = document.querySelector('#input-image');
  const width = Number(img.width);
  const height = Number(img.height);
  return {
    leftCol: clarifai_box.left_col * width,
    topRow: clarifai_box.top_row * height,
    rightCol: width - (clarifai_box.right_col * width),
    bottomRow: height - (clarifai_box.bottom_row * height)
  };
}

const mapStateToProps = (state) => ({
  imgURL: state.setImgURL.imgURL,
  box: state.setFaceBox.box,
  isAuthenticated: state.setAuth.isAuthenticated,
  user: state.setAuth.user,
  isCorrect: state.setAuth.isCorrect,
  isRegistration: state.register.isRegistration
});

const mapDiscpatchToProps = (dispatch) => ({
  onButtonSubmit: () => {
    const input = document.querySelector('input');
    const url = input.value;
    const id = store.getState().setAuth.user.id;
    dispatch(buttonSubmit(url));
    fetch('https://dry-depths-30112.herokuapp.com/predict', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://dry-depths-30112.herokuapp.com/image', {
              method: "PUT",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id })
            })
              .then(res => res.json())
              .then(user => dispatch(updateUser(user)))
              .catch(console.log);
        }
        dispatch(addingFaceBox(calculateFaceLocation(response)));
      })
      .catch(console.log);
  },
  onAuth: () => {
    const email = document.querySelector('#email-address').value;
    const password = document.querySelector('#password').value;
    const payload = {
      email: email,
      password: password
    };
  
    (async () => {
      const response = await fetch('https://dry-depths-30112.herokuapp.com/signin', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        dispatch(userAuthorization(data));
      } else {
        dispatch(incorrectData());
      }
    })();
  },
  onRegister: () => {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email-address').value;
    const password = document.querySelector('#password').value;
    const payload = {
      name: name,
      email: email,
      password: password
    };
    (async () => {
      const response = await fetch('https://dry-depths-30112.herokuapp.com/register', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        dispatch(userAuthorization(data));
      } else {
        dispatch(incorrectData());
      }
    })();
  },
  onLogout: () => dispatch(userLogout()),
  toRegister: () => dispatch(userRegistration()),
  leaveRegister: () => dispatch(leaveRegistration())
});

const particlesOptions = {
  particles: {
    number: {
      value: 130,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const App = ({ imgURL, box, onButtonSubmit, onAuth, onLogout, onRegister, isAuthenticated, user, isCorrect, isRegistration, toRegister, leaveRegister }) => {

  return (
      <Switch>
        <Route exact path="/" render={() => {return isAuthenticated ? 
        <div className="App">
          <Particles className='particles' params={particlesOptions} />
          <Navigation onLogout={onLogout} isAuthenticated={isAuthenticated} />
          <Logo />
          <Rank user={user} />
          <ImageLinkForm onButtonSubmit={onButtonSubmit} />
          <FaceRecognition imgURL={imgURL} box={box} />
        </div> : 
          isRegistration ? 
          <div>
            <Particles className='particles' params={particlesOptions} />
            <Navigation onLogout={onLogout} isAuthenticated={isAuthenticated}  toRegister={toRegister} leaveRegister={leaveRegister} />
            <Register onRegister={onRegister} isCorrect={isCorrect} />
          </div> : 
          <div>
            <Particles className='particles' params={particlesOptions} />
            <Navigation onLogout={onLogout} isAuthenticated={isAuthenticated}  toRegister={toRegister} leaveRegister={leaveRegister} />
            <Signin onAuth={onAuth} isCorrect={isCorrect} />
          </div>}} />
      </Switch>
  );
}

export default connect(mapStateToProps, mapDiscpatchToProps)(App);
