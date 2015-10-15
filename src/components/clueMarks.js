'use strict';

import React from 'react';
import _ from 'lodash';

class ClueMarks extends React.Component {
  constructor (props) {
    super(props);

    this.propTypes = {
      marks: React.PropTypes.array.isRequired
    }
  }

  render () {
    return (
      <div className="clue-marks">
        {this.props.marks.map((mark, index) => {
          return (
            <div className="clue-mark" key={index}>{mark}</div>
          );
        })}
      </div>
    );
  }
};

export default ClueMarks;
