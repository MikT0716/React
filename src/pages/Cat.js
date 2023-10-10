export const Cat = (props) => {
    return (
        <div className="min-vh-75 justify-content-center">
            <div className="text-center">
                <h1 className="my-3">Cat Fact Generator</h1>
                <h3 className="my-3">Generate meawsome Cat Facts!</h3>
                <p>{props.catFact}</p>

                <button
                    onClick={props.fetchCats}
                    className="catButton"
                ></button>
            </div>
        </div>
    );
};
