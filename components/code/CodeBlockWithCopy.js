import * as React from 'react';
import FlatButton from '../button/FlatButton';
import OutlinedCard from '../card/OutlinedCard';
import { copyToClipboard } from '../../helpers/keyboard';
import CodeBlock from '../code/CodeBlock';
/**
 * @extends {React.Component<CodeBlockWithCopyProps>}
 */
class CodeBlockWithCopy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { language, value, className } = this.props;
        return (
            <div className={className}>
                <div className="d-flex flex-column">
                    <div style={{ position: 'relative' }}>
                        <FlatButton
                            style={{
                                position: 'absolute',
                                top: '7px',
                                right: '7px',
                                padding: '1px',
                            }}
                            label="Copy"
                            onClick={() => copyToClipboard(value)}
                        />
                    </div>

                    <OutlinedCard className="p-3">
                        <CodeBlock language={language} value={value} />
                    </OutlinedCard>
                    {language && (
                        <div className="text-sm detail d-flex pt-1 pr-2 pl-2">
                            <div className="flex-grow-1"></div>
                            <span>Language: {language}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default CodeBlockWithCopy;
/**
 * @typedef CodeBlockWithCopyProps
 * @property {string} [className]
 * @property {string} [value]
 * @property {string} [language]
 */
