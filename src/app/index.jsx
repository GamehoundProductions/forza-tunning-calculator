import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";

import TunningEntry from "TunningEntry.jsx";
import WeightTunning from "WeightTunning.jsx";

require("./styles/general.scss");


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weight: 50,
      bump_front: { min: 0, max: 5 },
      bump_rear: { min: 0, max: 5 }
    };

    this.setWeight = this.setWeight.bind(this)
    this.eventValue = this.eventValue.bind(this)
    this.calculateBumpStiff = this.calculateBumpStiff.bind(this)
    this.dampingChanged = this.dampingChanged.bind(this)
  }//constructor


  eventValue(event) { return event.target.value; }


  setWeight(event) {
    this.setState(
      { weight: parseFloat(this.eventValue(event)) }
    )
  }

  dampingChanged(props, currValue, frontOrRear) {
    let newState = {};

    if (frontOrRear.toLowerCase() == 'front') {
      newState = this.state.bump_front;
    } else {
      newState = this.state.bump_rear;
    }

    let calculated = this.calculateBumpStiff(currValue);
    newState.min = calculated[0];
    newState.max = calculated[1];
    this.setState(newState);
  }//dampingChanged


  calculateBumpStiff(dampingValue) {
    return [dampingValue * 0.5, dampingValue * 0.75];
  }


  render() {
    return (
      <Container id="svgBody" fluid>
        <Row style={{ marginTop: "45px", marginBottom: "15px" }}>
          <Col style={{ textAlign: "center" }}>
            <h1>
              Forza Horizon 4
            </h1>
            <h2>
              Simple Formula-based Car Tunning Calculator
            </h2>

            <h3>
              Front: [(max - min) * FrontWeightDistribution%] + min
            </h3>
            <h3>
              Rear: [(max - min) * (100 - RearWeightDistribution%)] + min
            </h3>

            <h4>
              Based on <a href="https://www.youtube.com/watch?v=qKhrvG8v6TY">this</a> video.
            </h4>
          </Col>
        </Row>

        {/* WEIGHT */}

        <TunningEntry
          col1=""
          col2=""
          col3=""
          id="weight"
          className="dsc"
          dsc="Front Weight Distribution"
          onMinChange={this.setWeight}

          min={this.state.weight}
          max={-1}
          result={-1}
        />
        <hr className="divider"></hr>

        {/* REBOUND STIFFNESS */}

        <WeightTunning
          weight={this.state.weight}
          headerText={["rebound stiffness", "soft", "stiff"]}
          minChangedListener={this.dampingChanged}
          maxChangedListener={this.dampingChanged}
        />

        <hr className="divider"></hr>

        {/* BUMP STIFFNESS */}

        <TunningEntry
          col1="bump stiffness"
          col2="min"
          col3="max"
          id={"front_bumpd_stiffness"}
          className="dsc"
          dsc="Front"

          min={this.state.bump_front.min}
          max={this.state.bump_front.max}
          result={-1}
        />

        <TunningEntry
          noHeader
          col1="bump stiffness"
          col2="soft"
          col3="stiff"
          id={"rear_bumpd_stiffness"}
          className="dsc"
          dsc="Rear"
          entryMargin="2px"
          min={this.state.bump_rear.min}
          max={this.state.bump_rear.max}
          result={-1}
        />

        <hr className="divider"></hr>

        {/* SPRINGS */}

        <WeightTunning
          weight={this.state.weight}
          headerText={["springs", "soft", "stiff"]}
        />

        <hr className="divider"></hr>

        {/* ANTI-ROLL BARS */}

        <WeightTunning
          weight={this.state.weight}
          headerText={["anti-roll bars", "soft", "stiff"]}
          min={1}
          max={65}
        />

        <Row>
          <Col style={{ height: "150px", }}>
          </Col>
        </Row>

      </Container>
    );
  }//render
}//app


render(<App />, document.getElementById("app"));