import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js'; // import hljs library
import 'highlight.js/styles/solarized-light.css'; // import your preferred style
import './hljs.override.css';
const registeredLanguages = {}; // keep a record of registered languages

function loadLanguage(language_raw) {
  if (language_raw) {
    let language_safe = ('' + language_raw).toLowerCase();
    if (!registeredLanguages[language_safe]) {
      try {
        let lang = hljs.getLanguage(language_safe);
        if (!lang) {
          throw new Error('Invalid language');
        }
        const newLanguage = require(`highlight.js/lib/languages/${language_safe}`);
        hljs.registerLanguage(language_safe, newLanguage);
        registeredLanguages[language_safe] = true;
        //Successfully loaded language
        return true;
      } catch (err) {
        //Failed to load language
        return false;
      }
    } else {
      //Language already loaded
      return true;
    }
  }
  //Language not set
  return false;
}
/**
 * @param {CodeBlockProps} props
 */
function CodeBlock(props) {
  const { language, value } = props;
  const codeNode = React.useRef(null);
  let scanTask = null;
  /**
   * Highlight the code
   */
  const highlight = () => {
    codeNode && codeNode.current && hljs.highlightBlock(codeNode.current);
  };
  //Handle changes to the language or value
  useEffect(() => {
    let isLanguageLoaded = loadLanguage(language);
    if (isLanguageLoaded) {
      scanTask = setTimeout(() => highlight(), 100);
    }
    return () => {
      //Clear the interval if there is
      scanTask ? clearTimeout(scanTask) : null;
    };
  }, [language, value]);
  return (
    <pre style={{ margin: '0px' }}>
      <code
        ref={codeNode}
        style={{ whiteSpace: 'pre-wrap' }}
        className={language}
      >
        {value}
      </code>
    </pre>
  );
}
export default CodeBlock;

CodeBlock.propTypes = {
  value: PropTypes.node.isRequired,
  language: PropTypes.string,
};
// optionally set the language you think will use most as a default value
// if you don't set this, I would encourage to make language prop required,
// or at least improve the "else" statement in "componentDidMount"
CodeBlock.defaultProps = {
  language: 'javascript',
};
/**
 * @typedef CodeBlockProps
 * @property {string} [language]
 * @property {string} [value]
 */
