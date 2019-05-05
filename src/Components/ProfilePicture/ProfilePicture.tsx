import React, {Component} from 'react';
import './ProfilePicture.css';
import Auth from "../Auth/Auth";

const Cropper = require('react-easy-crop');


interface ProfilePictureProps {
    show: boolean
    onClose: Function
}


class ProfilePicture extends React.Component<ProfilePictureProps> {
    state = {
        imageSelected: false,
        image: undefined,
        crop: {x: 0, y: 0},
        zoom: 1,
        aspect: 1,
        croppedAreaPixel: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    };

    drawCanvas = (e?: any) => {
        if (this.state.image) {
            const canvas = document.createElement('canvas');
            canvas.width = this.state.croppedAreaPixel.width;
            canvas.height = this.state.croppedAreaPixel.height;

            let img = new Image();
            img.src = this.state.image as any;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(
                    img,
                    this.state.croppedAreaPixel.x,
                    this.state.croppedAreaPixel.y,
                    this.state.croppedAreaPixel.width,
                    this.state.croppedAreaPixel.height,
                    0,
                    0,
                    this.state.croppedAreaPixel.width,
                    this.state.croppedAreaPixel.height
                );

                canvas.toBlob((file) => {
                    const formData = new FormData();
                    formData.append('file', (file as Blob), 'image.png');

                    fetch('api//member/me/image', {
                        method: 'POST',
                        headers: {
                            'Authorization': Auth.getToken(),
                        },
                        body: formData
                    })
                        .then(res => {
                            if (res.status === 204) {
                                this.closeModal();
                            }
                        })
                });
            }
        }
    };

    deleteImage = (e?: any) => {
        fetch('/api/member/me/image', {
            method: 'DELETE',
            headers: {
                'Authorization': Auth.getToken(),
            }
        }).then(res => this.props.onClose(false))
    };

    onCropChange = (crop: object) => {
        this.setState({crop})
    };

    onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        this.setState({croppedAreaPixel: croppedAreaPixels})
    };

    onZoomChange = (zoom: number) => {
        this.setState({zoom})
    };

    onFileChange = async (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            let reader = new FileReader();

            reader.onload = (e) => {
                let img = new Image();
                img.src = (e.target as any).result; // File contents here
                this.setState({
                    imageSelected: true,
                    image: img.src,
                    crop: {x: 0, y: 0},
                    zoom: 1,
                })
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    closeModal = (e?: any) => {
        this.setState({
            imageSelected: false,
            image: undefined,
            crop: {x: 0, y: 0},
            zoom: 1
        });
        this.props.onClose(false)
    };

    render() {
        console.log(this.state);
        return (
            !this.props.show ? '' :
                <div className="profile_picture" onClick={this.closeModal}>
                    <div className="modal" onClick={(event: any) => {
                        event.stopPropagation()
                    }}>
                        <div className="info">Choisissez une photo</div>
                        <input type="file" onChange={this.onFileChange}/>
                        {
                            this.state.imageSelected ?
                                <React.Fragment>
                                    <div className="cropper_container">
                                        <Cropper
                                            image={this.state.image}
                                            crop={this.state.crop}
                                            zoom={this.state.zoom}
                                            aspect={this.state.aspect}
                                            onCropChange={this.onCropChange}
                                            onCropComplete={this.onCropComplete}
                                            onZoomChange={this.onZoomChange}
                                        />
                                    </div>
                                    <input type="button" className='classical_button red'
                                           onClick={this.closeModal} value="Annuler"/>
                                    <input type="button" className='classical_button green'
                                           onClick={this.drawCanvas} value="Envoyer"/>
                                </React.Fragment> :
                                <React.Fragment>
                                    <input type="button" className='classical_button red'
                                           onClick={() => this.props.onClose(false)} value="Annuler"/>
                                    <input type="button" className="delete_div red" value="Supprimer la photo"
                                           onClick={this.deleteImage}/>
                                </React.Fragment>
                        }
                    </div>
                </div>
        )
    }
}

export default ProfilePicture
