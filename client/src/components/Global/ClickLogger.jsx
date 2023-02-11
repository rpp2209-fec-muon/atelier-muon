import React from 'react';
import axios from 'axios';

const withLogger = (WrappedComponent, widget) => {
  return class ClickLogger extends React.Component {
    constructor(props) {
      super(props);

      this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
      var element = e.target.outerHTML;
      var time = new Date().toLocaleString();
      var params = {
        element: element,
        widget: widget,
        time: time
      }
      console.log(params.element);
      axios.post('/interactions', params)
      .then(function (response) {
        console.log("POST Interactions successful");
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    render() {
      const { title, content } = this.props;
      return (
        <div>
          <WrappedComponent {...this.props} onClick={this.onClick} />
        </div>
      );
    }
  }
}

export default withLogger;