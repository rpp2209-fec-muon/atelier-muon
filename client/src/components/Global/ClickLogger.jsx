import React from 'react';

const withLogger = (WrappedComponent, widget) => {
  return class ClickLogger extends React.Component {
    constructor(props) {
      super(props);

      this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
      console.log(`**${widget}`, e.target)
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