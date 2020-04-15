import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js'; // import hljs library
import 'highlight.js/styles/solarized-light.css'; // import your preferred style
import './hljs.override.css';
const registeredLanguages = {}; // keep a record of registered languages

/**
 * @extends {React.Component<CodeBlockProps>}
 */
export default class CodeBlock extends Component {
    constructor(props) {
        super(props);
        // do not show anything until language is loaded
        this.state = { loaded: false, isValidLanguage: false };
        // create a ref to highlight only the rendered node and not fetch all the DOM
        this.codeNode = React.createRef();
        this.highlightInterval = null;
        this.isUpdatePending = false;
    }

    componentDidMount() {
        let { language } = this.props;
        let { isValidLanguage } = this.state;
        language = language.toLowerCase();
        if (language && !registeredLanguages[language]) {
            try {
                const newLanguage = require(`highlight.js/lib/languages/${language}`);
                hljs.registerLanguage(language, newLanguage);
                registeredLanguages[language] = true;
                isValidLanguage = true;
            } catch (e) {
                console.error(e);
                console.error(`Cannot register and higlight language ${language}`);
            }
            this.setState(
                () => {
                    return { loaded: true, isValidLanguage };
                },
                () => {
                    this.highlight();
                }
            );
        } else {
            this.setState({ loaded: true, isValidLanguage: false });
        }
        this.highlightInterval = setInterval(() => {
            this.updateHighlighting();
        }, 100);
    }

    async updateHighlighting() {
        if (this.isUpdatePending) {
            this.highlight();
            this.isUpdatePending = false;
        }
    }

    componentDidUpdate() {
        this.isUpdatePending = true;
    }

    highlight = () => {
        let { isValidLanguage } = this.state;
        if (isValidLanguage) {
            this.codeNode && this.codeNode.current && hljs.highlightBlock(this.codeNode.current);
        }
    };

    render() {
        const { language, value } = this.props;
        const { loaded } = this.state;
        if (!loaded) return ''; // or show a loader
        return (
            <pre style={{ margin: '0px' }}>
                <code ref={this.codeNode} className={language}>
                    {value}
                </code>
            </pre>
        );
    }
}

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
