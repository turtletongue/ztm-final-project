import './App.css';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import { connect } from 'react-redux';
import { buttonSubmit, addingFaceBox } from '../actions';
import Clarafai from 'clarifai';

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
  box: state.setFaceBox.box
});

const mapDiscpatchToProps = (dispatch) => ({
  onButtonSubmit: () => {
    const input = document.querySelector('input');
    const url = input.value;
    dispatch(buttonSubmit(url));
    app.models.predict(Clarafai.FACE_DETECT_MODEL, url)
      .then(response => dispatch(addingFaceBox(calculateFaceLocation(response))))
      .catch(error => console.log(error));
  }
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

const App = ({ imgURL, box, onButtonSubmit }) => {
  return (
    <div className="App">
      <Particles className='particles' params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onButtonSubmit={onButtonSubmit} />
      <FaceRecognition imgURL={imgURL} box={box} />
    </div>
  );
}

export default connect(mapStateToProps, mapDiscpatchToProps)(App);
