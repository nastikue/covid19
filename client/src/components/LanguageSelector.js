import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Dropdown } from 'semantic-ui-react';

import { whitelist, languages } from '../constants/languages';
import '../styles/LanguageSelector.css';

class LanguageSelector extends Component {
  render() {
    const { i18n } = this.props;
    const language = languages[i18n.language];

    const switchLanguage = (value, text) => () => {
      i18n.changeLanguage(value);
      this.props.handleChangeLanguage(text);
    };

    return language ? (
      <div className="language-selector">
        <Dropdown text={language}>
          <Dropdown.Menu className={this.props.className}>
            {whitelist.map((key) => (
              <Dropdown.Item
                selected={key === i18n.language}
                key={key}
                text={languages[key]}
                onClick={switchLanguage(key, languages[key])}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    ) : null;
  }
}

export default withTranslation()(LanguageSelector);
