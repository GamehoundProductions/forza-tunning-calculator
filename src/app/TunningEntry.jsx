import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";


class TunningEntry extends React.Component {

    constructor(props) {
        super(props);

        this.createInput = this.createInput.bind(this)
        this.createHeader = this.createHeader.bind(this)
    }//constructor


    createInput(inputType) {
        let eventFunc = () => { };
        let val = 0;
        let isDisable = false;

        let id = this.props.id.replace(" ", "_");
        switch (inputType) {
            case (this.props.col1):
                eventFunc = this.props.onMinChange;
                val = this.props.min;
                id = id + "_min";
                break;
            case (this.props.col2):
                eventFunc = this.props.onMaxChange;
                val = this.props.max;
                id = id + "_max";
                break;
            case (this.props.col4):
                eventFunc = this.props.onResultChange;
                val = this.props.result;
                isDisable = true;
                id = id + "_result";
                break;
        }//switch
        return (
            <input id={id}
                onChange={eventFunc}
                placeholder={val}
                onFocus={(e) => { e.target.placeholder = "" }}
                onBlur={(e) => e.target.placeholder = val}
                disabled={isDisable} />
        )
    }//createInput


    createHeader() {
        console.log(this.props.col4);
        return (
            <Row className="dsc" style={{ textAlign: "center", marginBottom: "20px" }}>
                <Col>
                    {this.props.col1.toUpperCase()}
                </Col>
                <Col>
                    {this.props.col2.toUpperCase()}
                </Col>
                <Col>
                    {this.props.col3.toUpperCase()}
                </Col>
                <Col>
                    {this.props.result != -1 ? this.props.col4.toUpperCase() : ""}
                </Col>
            </Row>
        );
    }


    render() {
        return (
            <Container fluid className="tunning-entry" style={{ marginTop: this.props.entryMargin }}>

                {this.props.noHeader ? "" : this.createHeader()}

                <Row>
                    <Col className="dsc">
                        {this.props.dsc}
                    </Col>

                    <Col>
                        {this.props.min != -1 ? this.createInput(this.props.col1) : ""}
                    </Col>

                    <Col>
                        {this.props.max != -1 ? this.createInput(this.props.col2) : ""}
                    </Col>

                    <Col style={{ paddingLeft: "20px" }}>
                        {this.props.result != -1 ? this.createInput(this.props.col4) : ""}
                    </Col>

                </Row>

            </Container>
        );
    }//render
}//app

TunningEntry.defaultProps = {
    entryMargin: "0px",
    col1: "type",
    col2: "min",
    col3: "max",
    col4: "result"
}

export default TunningEntry;