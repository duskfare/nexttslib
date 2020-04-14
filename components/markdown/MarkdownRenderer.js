import * as React from 'react';
import MarkdownRendererCodeBlock from './renderers/MarkdownRendererCodeBlock';
import ReactMarkdown from 'react-markdown';
/**
 * @extends {React.Component<MarkdownRendererProps>}
 */
class MarkdownRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { markdown } = this.props;
        return (
            <ReactMarkdown
                source={markdown}
                renderers={{
                    code: MarkdownRendererCodeBlock,
                }}
            />
        );
    }
}
export default MarkdownRenderer;
/**
 * @typedef MarkdownRendererProps
 * @property {string} [markdown]
 */
