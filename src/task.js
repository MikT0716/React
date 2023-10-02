import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export const Task = (props) => {
    return (
        <div>
            <Container>
                <Row className="my-2 justify-content-center">
                    <Col
                        xs={3}
                        className={props.completed ? "py-2 completed" : "py-2"}
                    >
                        {props.taskName}
                    </Col>
                    <Col xs={2} className="justify-content-center">
                        <Button
                            className="mx-2"
                            variant="success"
                            onClick={() => props.completeTask(props.id)}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => props.deleteTask(props.id)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
