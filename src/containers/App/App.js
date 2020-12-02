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
import { buttonSubmit, addingFaceBox, userAuthorization, userLogout } from '../../actions';
import Clarafai from 'clarifai';
import { Route, Switch } from 'react-router-dom';

const app = new Clarafai.App({
  apiKey: '9ec533d3c31a4f7e8c1b089a0b93b8da'
});

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
  login: state.setAuth.login
});

const mapDiscpatchToProps = (dispatch) => ({
  onButtonSubmit: () => {
    const input = document.querySelector('input');
    const url = input.value;
    dispatch(buttonSubmit(url));
    app.models.predict(Clarafai.FACE_DETECT_MODEL, url)
      .then(response => dispatch(addingFaceBox(calculateFaceLocation(response))))
      .catch(error => console.log(error));
  },
  onAuth: () => {
    const loginInput = document.querySelector('#email-address');
    const login = loginInput.value;
    dispatch(userAuthorization(login));
  },
  onLogout: () => dispatch(userLogout())
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

const App = ({ imgURL, box, onButtonSubmit, onAuth, onLogout, isAuthenticated, login }) => {
  return (
      <Switch>
        <Route exact path="/" render={() => {return isAuthenticated ? 
        <div className="App">
          <Particles className='particles' params={particlesOptions} />
          <Navigation onLogout={onLogout} isAuthenticated={isAuthenticated} />
          <Logo />
          <Rank login={login} />
          <ImageLinkForm onButtonSubmit={onButtonSubmit} />
          <FaceRecognition imgURL={imgURL} box={box} />
        </div> : 
        <div>
          <Particles className='particles' params={particlesOptions} />
          <Navigation onLogout={onLogout} isAuthenticated={isAuthenticated} />
          <Signin onAuth={onAuth} />
        </div>}} />
        <Route path="/register">
          <div>
            <Particles className='particles' params={particlesOptions} />
            <Navigation onLogout={onLogout} isAuthenticated={isAuthenticated} />
            <Register onAuth={onAuth} />
          </div>
        </Route>
      </Switch>
  );
}

export default connect(mapStateToProps, mapDiscpatchToProps)(App);
