import { Component } from 'react';
import { connect } from "react-redux";

import { useParams } from 'react-router';

import { updateTutorial } from "../actions/tutorials";

import { 
    Container,
    Row,
    Col,
    Form,
    Label,
    Card,
    CardBody,
    CardText,
    FormGroup,
    Input,
    Button,
    Alert
 } from 'reactstrap';

import TutorialDataService from '../services/tutorial.service';

//Gambiarra para conseguir acessar o useParams através de um Class Component
export function withRouter(Children) {
    return(props) => {
        const match = {params: useParams()};
        
        return <Children {...props} match={match} />
    }
}

class Tutorial extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            currentTutorial: {
                id: null,
                title: '',
                description: '',
                published: false,
            },
            message: '',
        };
    }

    componentDidMount() {
        this.getTutorial(this.props.match.params.id);
        
    }

    getTutorial(id) {
       TutorialDataService.get(id)
       .then(r => {
           this.setState({
               currentTutorial: r.data
           });
       })
       .catch(e => console.log(e));
    }

    handleChangeTitle = (e) => {
        const title = e.target.value;

        this.setState(prevState => {
            return {
                currentTutorial : {
                    ...prevState.currentTutorial,
                    title: title
                }
            }
        })
    }

    handleChangeDescription = (e) => {
        const description = e.target.value;

        this.setState(prevState => {
            return {
                currentTutorial: {
                    ...prevState.currentTutorial,
                    description: description
                }
            }
        });
    }

    updateContent = () => {
        this.props.updateTutorial(this.state.currentTutorial.id, this.state.currentTutorial)
        .then(response => {
            this.setState({message: response.message});
            setTimeout(() => {this.setState({message: ''})}, 3000)
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateStatus = (status) => {
        var data = {
            id: this.state.currentTutorial.id,
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
            published: status
        }

        this.props.updateTutorial(this.state.currentTutorial.id, data)
        .then(response => {
            this.setState(prevState => ({
                currentTutorial: {
                    ...prevState.currentTutorial,
                    published: status,
                }
            }))

            this.setState({message: response.message});
            setTimeout(() => {this.setState({message: ''})}, 3000)
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const {currentTutorial} = this.state;

        return(
            <Container>
                <Row>
                    <Col>
                        {
                            currentTutorial.id !== null ? (
                                <Form>
                                    <FormGroup>
                                        <Label>
                                            <strong>
                                                Title
                                            </strong>: 
                                        </Label>
                                        
                                        <Input
                                            value={currentTutorial.title}
                                            onChange={this.handleChangeTitle}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>
                                            <strong>
                                                Description
                                            </strong>:
                                        </Label>

                                        <Input
                                            value={currentTutorial.description}
                                            onChange={this.handleChangeDescription}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>
                                            <strong>
                                                Status
                                            </strong>:
                                        </Label>

                                        {currentTutorial.published ? ' Published' : ' Pending'}
                                    </FormGroup>

                                    <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Col xs="2">
                                            {currentTutorial.published ? 
                                                (
                                                    <Button
                                                        onClick={() => this.updateStatus(false)}
                                                    >
                                                        Unpublish
                                                    </Button>
                                                ) : 
                                                (
                                                    <Button
                                                        onClick={() => this.updateStatus(true)}
                                                    >
                                                        Publish
                                                    </Button>
                                                )
                                            }
                                        </Col>

                                        <Col xs="2">
                                            <Button
                                                onClick={() => this.updateContent()}
                                            >
                                                Update
                                            </Button>
                                        </Col>
                                    </Row>
                                    
                                    <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem'}}>
                                        {
                                            this.state.message !== '' ?
                                            (   
                                                <Alert style={{width: '50%'}}>
                                                    {this.state.message}
                                                </Alert>
                                                
                                            ) : ''
                                        }
                                    </Row>
                                </Form>
                            ) :
                            (
                                <Card>
                                    <CardBody>
                                        <CardText>
                                            Please select a valid tutorial...
                                        </CardText>
                                    </CardBody>
                                </Card>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(null, { updateTutorial })(withRouter(Tutorial));