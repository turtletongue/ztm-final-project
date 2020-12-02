import './FaceRecognition.css';

const FaceRecognition = ({ imgURL, box }) => {
    return (
    <div className="center ma">
        <div className="absolute mt2 mb2">
            {imgURL ? 
                <img src={imgURL} id="input-image" alt="result" width="500px" height="auto" /> : 
                <div></div>
            }
            <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
    </div>
    );
}

export default FaceRecognition;