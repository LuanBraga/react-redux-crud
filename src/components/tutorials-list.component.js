//beside global state tutorials, we also have following local state:
//searchTitle
//currenttutorial
//currentIndex

import { Component } from "react";
import { connect } from "react-redux";

import {
    retrieveTutorials,
    findTutorialsByTitle,
    deleteAllTutorials
} from "../actions/tutorials";

import { 
    InputGroup, 
    Button, 
    Col, 
    Container, 
    Input, 
    ListGroup, 
    ListGroupItem, 
    Row, 
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardTitle
} from "reactstrap";

//to connect redux store with this Component state and props
//we use connect() with mapStateToProps and mapDispatchToProps
const mapStateToProps = (state) => {
    return {
        tutorials: state.tutorials
    }
}

class TutorialList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: '',
        };
    }

    componentDidMount() {
        this.props.retrieveTutorials();
    }

    setActiveTutorial = (tutorial, index) => {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }

    handleSearchInputTitle = (e)  => {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    refreshData = () => {
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    findByTitle = () => {
        this.refreshData();

        this.props.findTutorialsByTitle(this.state.searchTitle);
    }

    render() {
        const { searchTitle, currentTutorial, currentIndex } = this.state;
        const { tutorials } = this.props;

        return (
            <Container fluid>
                <Row style={{marginBottom: '1rem'}}>
                    <Col>
                        <InputGroup>
                            <Input
                                type="search"
                                placeholder="Search tutorial"
                                value={searchTitle}
                                onChange={this.handleSearchInputTitle}
                            />

                            <Button
                                outline
                                color="dark"
                                onClick={this.findByTitle}
                            >
                                Search
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs="7">
                        <ListGroup>
                            {
                                tutorials && tutorials.map((tutorial, index) => (
                                    <ListGroupItem
                                        action
                                        className={index === currentIndex ? 'active' : ''}
                                        key={index}
                                        onClick={() => this.setActiveTutorial(tutorial, index)}
                                    >
                                        {tutorial.title}
                                    </ListGroupItem>
                                ))
                            }
                        </ListGroup>
                    </Col>

                    <Col>
                        <Card>
                            <CardHeader>
                                Tutorial
                            </CardHeader>
                            <CardBody>
                                <CardTitle tag="h5">
                                    {
                                        currentTutorial === null?
                                        '':
                                        `Title: ${currentTutorial.title}.`
                                    }
                                </CardTitle>

                                <CardText>
                                    {
                                        currentTutorial === null ? 
                                        'Select an item from the list.' : 
                                        `Description: ${currentTutorial.description}.`
                                    }
                                </CardText>

                                <Button>
                                    Edit
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect( mapStateToProps, {
    retrieveTutorials,
    findTutorialsByTitle,
    deleteAllTutorials
    }
)(TutorialList);