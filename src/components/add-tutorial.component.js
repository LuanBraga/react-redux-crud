import { Component } from "react";
import { connect } from "react-redux";
import { createTutorial } from "../actions/tutorials";

import { 
    Container, 
    Form, 
    FormGroup, 
    Card, 
    CardBody, 
    CardTitle,
    CardText,
    Button,
    Label,
    Input,
} from "reactstrap"

class AddTutorial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            description: '',
            published: false,

            submitted: false,
        };
    }

    handleChangeTitle = (e) => {
        console.log(e.target.value)

        this.setState({
            title: e.target.value,
        });
    }

    handleChangeDescription = (e) => {
        console.log(e.target.value)

        this.setState({
            description: e.target.value,
        });
    }

    saveTutorial = () => {
        const { title, description } = this.state;

        this.props
            .createTutorial(title, description)
            .then(data => {
                this.setState({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    published: data.published,

                    submitted: true,
                });
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTutorial = () => {
        this.setState({
            id: null,
            title: '',
            description: '',
            published: false,

            submitted: false
        });
    }

    render() {
        return(
        <Container fluid>    
            <Form>
                {this.state.submitted ? (
                    <Card>
                    <CardBody>
                      <CardTitle tag="h5">
                      {`The ${this.state.title} tutorial was Created!!`}
                      </CardTitle>
                      <CardText>
                        You submitted successfully!
                      </CardText>
                      <Button>
                        Add new tutorial
                      </Button>
                    </CardBody>
                  </Card>
                ) : (
                    <>
                        <FormGroup>
                            <Label for="title">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Tutorial title"
                                type="text"
                                value={this.state.title}
                                onChange={this.handleChangeTitle} 
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">
                                Description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Tutorial description"
                                type="text"
                                value={this.state.description}
                                onChange={this.handleChangeDescription} 
                            />
                        </FormGroup>
                       
                        <Button
                            onClick={this.saveTutorial}
                        >
                            Submit
                        </Button>
                    </>
                )}
            </Form> 
        </Container>);
    }
}

export default connect(null, { createTutorial })(AddTutorial);