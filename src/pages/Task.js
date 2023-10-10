import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export const Task = (props) => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row my-2 justify-content-center">
                    <div
                        className={
                            props.completed
                                ? "col-5 col-sm-5 col-md-3 py-2 ms-3 completed"
                                : "col-5 col-sm-5 col-md-3 py-2 ms-3"
                        }
                    >
                        {props.taskName}
                    </div>
                    <div className="col-4 col-md-2">
                        <button
                            type="button"
                            className="btn btn-success mx-2"
                            onClick={() => props.completeTask(props.id)}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => props.deleteTask(props.id)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
