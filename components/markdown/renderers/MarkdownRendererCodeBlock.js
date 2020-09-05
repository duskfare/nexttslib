import * as React from 'react';
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
