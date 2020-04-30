import React from 'react';
import '../styles/Button.css';

class FlagButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }

  componentDidMount() {
    const svgToChangeColor = this.itemToChangeColor;
    svgToChangeColor.addEventListener('colorChanged', this.colorChangeDone);
  }

  componentWillUnmount() {
    const svgToChangeColor = this.itemToChangeColor;
    svgToChangeColor.removeEventListener('colorChanged', this.colorChangeDone);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selected > prevState.selected) {
      return {
        selected: nextProps.selected,
      };
    }
  }

  render() {
    return (
      <div
        className="flag-button-group"
        onClick={() => {
          this.props.onClick();
        }}
      >
        <svg
          ref={(e) => {
            this.itemToChangeColor = e;
          }}
          className={this.state.selected ? 'flag-button-clicked' : 'button'}
          viewBox="0 0 15 13"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Layer_1">
            <g>
              <path d="M9.4 2L9 0H0V17H2V10H7.6L8 12H15V2H9.4Z" />
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default FlagButton;
