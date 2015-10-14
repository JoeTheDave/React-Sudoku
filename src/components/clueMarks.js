'use strict';

import React from 'react';
import _ from 'lodash';

let ClueMarks = React.createClass({
  propTypes: {
    marks: React.PropTypes.array.isRequired
  },
  render: function () {
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
});

export default ClueMarks;
