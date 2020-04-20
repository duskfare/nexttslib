import * as React from 'react';
import FlatButton from '../../button/FlatButton';
import OutlinedCard from '../../card/OutlinedCard';
import { copyToClipboard } from '../../../helpers/keyboard';
import CodeBlock from '../../code/CodeBlock';
import CodeBlockWithCopy from '../../code/CodeBlockWithCopy';
/**
 * @extends {React.Component<MarkdownRendererCodeBlockProps>}
 */
class MarkdownRendererCodeBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const props = this.props;
        const { language, value } = this.props;
        return <CodeBlockWithCopy language={language} value={value} />;
    }
}
export default MarkdownRendererCodeBlock;
/**
 * @typedef MarkdownRendererCodeBlockProps
 * @property {string} [value]
 * @property {string} [language]
 */
