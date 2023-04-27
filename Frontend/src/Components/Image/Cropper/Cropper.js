import { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from '../Utils/cropImage'
import CancelIcon from '@mui/icons-material/Cancel';
import './Cropper.css'
import { dataURLtoFile } from "..//Utils/dataURLtoFile";
import { IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import Button  from 'react-bootstrap/Button';
import AlertCompnenet from "../../Alert/AlertCompnenet";


export default function RenderCropper({handleCropper, setPicImage, setShowCropper}) {
  const [error, setError] = useState(false); 
  const [message, setMessage] = useState('')
    const inputRef = useRef()
    const triggerFileSelectPopup = () => inputRef.current.click();


   
  
    const [image, setImage] = useState();
      const [croppedArea, setCroppedArea] = useState(null);
      const [crop, setCrop] = useState({ x: 0, y: 0 });
      const [zoom, setZoom] = useState(1);
  
      const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
          setCroppedArea(croppedAreaPixels);
      };

      
  
    const onSelectFile = (e) => {
      if(e.target.files && e.target.files.length > 0){
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.addEventListener("load", () => {
                  setImage(reader.result);
              });
      }
    }


      const onClear = () => {
        if (!image)
         {
          setError(true)
          setMessage("Cannot Clear empty image !")
         }else{
          setImage(null);
         }
    
      };

     

    const onUpload = async () => {
      if (!image)
        {
          setError(true)
          setMessage("Cannot Upload empty image !")
        }
  
      const canvas = await getCroppedImg(image, croppedArea);
      const canvasDataUrl = canvas.toDataURL("image/jpeg");
      const convertedUrlToFile = dataURLtoFile(
        canvasDataUrl,
        "cropped-image.jpeg"
      );

      const readeCovertFile = new FileReader();
        readeCovertFile.readAsDataURL(convertedUrlToFile)
        readeCovertFile.addEventListener("load", () => {
          setPicImage(readeCovertFile.result);
      });
          setShowCropper(false)
    }

  
    return (
      
        <div className='containerCropper-admin'>
          {error ?  <AlertCompnenet error = {message} /> : <></> }
          <div className='container-cropper'>
          <IconButton  onClick={handleCropper} className='Form_Button'>
            <CancelIcon  />
          </IconButton>
            {image ? (
              <>
                <div className='cropper'>
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
  
                <div className='slider'>
                  <Slider aria-label='slider-ex-1'  value={zoom}
                    onChange={(zoom) => setZoom(zoom)} min={1}
                    max={3}
                    step={0.1}>
                    <SliderTrack >
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </div>
              </>
            ) : null}
          </div>
        <div className="container-buttons">
          <input 
            type="file" 
            name="pic"
            accept="image/*"
            ref={inputRef}
            onChange= {onSelectFile}
            style={{ display:"none" }}
          />
          <Button
            className="Form_Button"
            onClick={() => onClear()}
            style={{ marginRight: "10px" }}
          >
            Clear
          </Button>
          <Button
            className="Form_Button"
            onClick={triggerFileSelectPopup }
            style={{ marginRight: "10px" }}
          >
            Choose
          </Button>
          <Button
            className="Form_Button"
            onClick={onUpload }
            style={{ marginRight: "10px" }}
          >
            Change
          </Button>
        </div>
      </div>
    );
}
