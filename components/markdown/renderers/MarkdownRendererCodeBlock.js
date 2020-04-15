import * as React from 'react';
import FlatButton from '../../button/FlatButton';
import OutlinedCard from '../../card/OutlinedCard';
import { copyToClipboard } from '../../../helpers/keyboard';
import CodeBlock from '../../code/CodeBlock';
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
        return (
            <div>
                <div style={{ position: 'relative' }}>
                    <FlatButton
                        style={{ position: 'absolute', top: '7px', right: '7px', padding: '1px' }}
                        label="Copy"
                        onClick={() => copyToClipboard(value)}
                    />
                </div>

                <OutlinedCard className="p-3">
                    <CodeBlock language={language} value={value} />
                    {/* <code style={{ whiteSpace: 'pre-wrap' }}>{value}</code> */}
                </OutlinedCard>
                {language && (
                    <div className="text-sm detail d-flex pt-1 pr-2 pl-2">
                        <div className="flex-grow-1"></div>
                        <span>Language: {language}</span>
                    </div>
                )}
            </div>
        );
    }
}
export default MarkdownRendererCodeBlock;
/**
 * @typedef MarkdownRendererCodeBlockProps
 * @property {string} [value]
 * @property {string} [language]
 */
