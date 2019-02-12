import React, {Component} from 'react';
import './Profile.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Redirect from "react-router-dom/es/Redirect";
import Auth from "../../Components/Auth/Auth";
import ProfileForm from "../../Components/ProfileForm/ProfileForm";
import PositionForm from "../../Components/PositionForm/PositionForm";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'pending', // 'connected' 'not_authenticate'
            modifyEnabled: false,
            positions:{},
            currentPositions:[],
            currentPositionsBackup:[],
            info: {
                firstName: '',
                lastName: '',
                email: '',
                telephone: '',
                department: {
                    id:'',
                    label:'',
                    name:'',
                },
                company: ''
            },
        }
    }

    componentDidMount() {
        if (!Auth.isConnected())
            this.setState({status: 'not_authenticate'});
        else
        {
            this.setState({status: "connected"});
            fetch('api/v1/core/member/me', {
                headers: {
                    Authorization: Auth.getToken()
                }
            })
                .then(res => res.json())
                .then((result) => {
                    this.setState({
                        info: result,
                        currentPositions : result.positions,
                        currentPositionsBackup : JSON.parse(JSON.stringify(result.positions))
                    });
                })
        }
    }


    updateInfo(data){
        data.positions=this.state.currentPositions;
        let i;
        for (i=0;i<data.positions.length;++i){
            data.positions[i].year=parseInt(data.positions[i].year,10)
        }
        fetch('api/v1/core/member/'+this.state.info.id, {
            method: 'PUT',
            headers: {
                'Authorization': Auth.getToken(),
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                        res.json()
                        .then((result) => {
                            this.setState({
                                info: result,
                                currentPositions : result.positions,
                                currentPositionsBackup : JSON.parse(JSON.stringify(result.positions))
                            });
                        })
                } else {
                    this.resetFields();
                    console.log('update fail');
                }
            });
        //disable modifications
        if (this.state.modifyEnabled) this.setModify(false);
    }

    setModify(state){
        this.setState({
            modifyEnabled: state,
        });
    }

    updatePositions(positions){
        this.setState({
            currentPositions : positions,
        });
    }

    resetFields(){
        this.setState({
            info : this.state.info,
            modifyEnabled : false,
            currentPositions : JSON.parse(JSON.stringify(this.state.currentPositionsBackup))
        });
    }

    render() {
        let activeButton = ["home"];
        if (this.state.status === 'not_authenticate')
            return <Redirect to='/'/>;

        activeButton.push('search');
        activeButton = Auth.addCorrectButton(activeButton);

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}> </Nav>
                <section className="Profile">
                    <ProfileForm info={this.state.info} update={this.updateInfo.bind(this)}
                                 modifyEnabled={this.state.modifyEnabled}
                                 setModify={this.setModify.bind(this)} resetFields={this.resetFields.bind(this)}
                    />
                    <PositionForm positions={this.state.positions} modifyEnabled={this.state.modifyEnabled}
                                  currentPositions={this.state.currentPositions}
                                  updatePositions={this.updatePositions.bind(this)}
                    />
                </section>
            </React.Fragment>
        );
    }
}

export default Profile;
