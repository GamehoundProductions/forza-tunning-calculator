import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';

import TunningEntry from 'TunningEntry.jsx';


class WeightTunning extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weight: 50,
            min: 0,
            max: 100
        };

        this.maxChange = this.maxChange.bind(this)
        this.minChange = this.minChange.bind(this)
        this.eventValue = this.eventValue.bind(this)
        this.calculate = this.calculate.bind(this)
        this.setDependantField = this.setDependantField.bind(this)
    }//constructor


    eventValue(event) { return event.target.value; }


    minChange(e, FrontOrRear = "front") {
        let min = this.eventValue(e);
        let max = this.state.max;
        let newState = {
            min: parseFloat(min),
            max: parseFloat(max)
        }

        this.setDependantField(this.props.dependantMin);
        if (this.isFunction(this.props.minChangedListener)) {
            this.props.minChangedListener(
                this.props,
                this.calculate(newState),
                FrontOrRear);
        }

        this.setState(newState);
    }//dampingMinChange


    maxChange(e, FrontOrRear = "front") {
        let min = this.state.min;
        let max = this.eventValue(e);
        let newState = {
            min: parseFloat(min),
            max: parseFloat(max)
        }

        this.setDependantField(this.props.dependantMax);
        if (this.isFunction(this.props.maxChangedListener)) {
            this.props.maxChangedListener(
                this.props,
                this.calculate(newState),
                FrontOrRear);
        }

        this.setState(newState);
    }//dampingMaxChange


    setDependantField(fieldName, value) {
        if (!fieldName)
            return;

        let dependantObj = document.getElementById(fieldName);
    }//setDependantField


    calculate(state, isFront = true) {
        //This formula based of youtube video by HokiHoshi:
        //https://www.youtube.com/watch?v=qKhrvG8v6TY
        let weight = this.props.weight;
        let min = state.min;
        let max = state.max;
        if (!isFront)
            weight = 100 - weight; //rear distribution
        weight = weight / 100;

        let result = ((max - min) * weight) + min
        return parseFloat(result);
    }//calculate


    isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }


    render() {
        return (
            <Container id='svgBody' style={{ marginTop: this.props.marginTop }} fluid>
                <TunningEntry
                    col1={this.props.headerText[0]}
                    col2={this.props.headerText[1]}
                    col3={this.props.headerText[2]}
                    // col4="result"
                    id={'front_' + this.props.headerText[0]}
                    className="dsc"
                    dsc="Front"
                    onMinChange={(evnt) => this.minChange(evnt, "front")}
                    onMaxChange={(evnt) => this.maxChange(evnt, "front")}

                    min={this.state.min}
                    max={this.state.max}
                    result={this.calculate(this.state)}
                />

                <TunningEntry
                    noHeader
                    id={'rear_' + this.props.headerText[0]}
                    col1={'rear_' + this.props.headerText[0]}
                    col2={'rear_' + this.props.headerText[1]}
                    col3={'rear_' + this.props.headerText[2]}
                    className="dsc"
                    dsc="Rear"
                    onMinChange={(evnt) => this.minChange(evnt, "rear")}
                    onMaxChange={(evnt) => this.maxChange(evnt, "rear")}

                    min={this.state.min}
                    max={this.state.max}
                    result={this.calculate(this.state, false)}
                    entryMargin="2px"
                />

            </Container>
        );
    }//render
}//app

WeightTunning.defaultProps = {
    headerText: ["TYPE", "MIN", "MAX"],
    marginTop: "0px",
    minChangedListener: NaN,
    maxChangedListener: NaN
}

export default WeightTunning;