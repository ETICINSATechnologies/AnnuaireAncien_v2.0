import React, {Component} from 'react';

import './Data.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import {Redirect} from "react-router";

interface AdminState {
    fileSpecified: boolean,
    fileDragged: boolean,
    fileName: string,
    uploadRequested: boolean,
    uploadSucceed: boolean,
    downloadRequested: boolean,
    downloadSucceed: boolean
}

class Data extends Component<{}, AdminState> {
    state = {
        fileSpecified: false,
        fileDragged: false,
        fileName: '',
        uploadRequested: false,
        uploadSucceed: false,
        downloadRequested: false,
        downloadSucceed: false
    };

    dragOverHandler = (event: any) => {
        this.setState({
            fileDragged: true
        });
        event.preventDefault();
    };

    dragLeaveHandler = (event: any) => {
        this.setState({
            fileDragged: false
        });
    };

    dropHandler = (event: any) => {
        let uploadInput = document.querySelector('#file-upload') as HTMLInputElement;
        uploadInput.files = event.dataTransfer.files;
        this.setState({
            fileSpecified: true,
            fileName: uploadInput.files![0].name
        });
        event.preventDefault();
    };

    fileInputChangeHandler = (event: any) => {
        this.setState({
            fileSpecified: true,
            fileName: event.target.files[0].name
        });
    };

    uploadClickHandler = () => {
        let fileInput = (document.querySelector('#file-upload') as HTMLInputElement);
        if (this.state.fileSpecified) {
            const formData = new FormData();
            formData.append('file', fileInput.files![0], this.state.fileName);
            fetch('api/yearbook/upload', {
                method: 'POST',
                headers: {
                    Authorization: Auth.getToken(),
                },
                body: formData
            })
                .then(res => {
                    if (res.status === 204 || res.status===200) {
                        this.setState({
                            uploadRequested: true,
                            uploadSucceed: true
                        })
                        res.json()
                            .then(data => {
                                alert('Le fichier a été téléchargé, ' + 
                                (data.totalMembers-data.errorMembers) + 
                                ' membres sur ' + data.totalMembers + ' ont été crées')
                            })
                    } else {
                        this.setState({
                            uploadRequested: true,
                        })
                    }
                })
        } else {
            alert("Vous n'avez pas encore spécifié un fichier!");
        }
    };

    downloadClickHandler = () => {
        fetch('api/yearbook/download', {
            method: 'GET',
            headers: {
                Authorization: Auth.getToken()
            }
        }).then((res) => {
            if (res.status === 200) {
                this.setState({
                    downloadRequested: true,
                    downloadSucceed: true
                });
                res.blob()
                    .then(file => {
                        // Create a temporary link in order to download the Spreadsheet
                        let link = document.createElement('a');
                        link.href = window.URL.createObjectURL(file);
                        link.download = "annuaire.xlsx";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    })
            } else {
                    this.setState({
                        downloadRequested: true,
                        downloadSucceed: false
                    });
                }
            }
        )
    };

    render() {
        if (!Auth.isAdmin())
            return <Redirect to='/'/>;

        let activeButton = ['home', 'search', 'member_creation'];
        activeButton = Auth.addCorrectButton(activeButton);

        return (<React.Fragment>
                <Header/>
                <Nav buttons={activeButton}/>
                <section className="Data">
                    <div className='import'>
                        <h2>Importer la base de données de l'annuaire</h2>
                        {
                            this.state.uploadRequested ?
                                this.state.uploadSucceed ?
                                    <h3 className='affirmation'>La base est mise à jour.</h3> :
                                    <h3 className='warning'>Une erreur est survenue.</h3> :
                                <h3 className='warning'>Attention! Cette action efface la base existante!</h3>
                        }
                        <div id='drop_zone' onDrop={this.dropHandler} onDragOver={this.dragOverHandler}
                             onDragLeave={this.dragLeaveHandler}>
                            {
                                this.state.fileSpecified ?
                                    <h2>{this.state.fileName}</h2> :
                                    this.state.fileDragged ?
                                        '' :
                                        <div className='indication'>
                                            <h3>Copier votre fichier ici</h3>
                                            <h3> OU </h3>
                                            <label className='upload' htmlFor='file-upload'>Choisir un fichier</label>
                                        </div>
                            }
                            <input id='file-upload' type='file' onChange={this.fileInputChangeHandler}/>
                        </div>
                        <input type='button' value='Envoyer' onClick={this.uploadClickHandler}/>
                    </div>
                    <div className='export'>
                        <input id='download' type='button' value="Télécharger l'Annuaire"
                               onClick={this.downloadClickHandler}/>
                        {this.state.downloadRequested ?
                            this.state.downloadSucceed ? '' : <h3 className='warning'>Une erreur est survenue.</h3>
                            : ''}
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Data;