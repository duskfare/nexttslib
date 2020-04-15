import * as React from 'react';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import './TextAreaEditor.css';
// import '@webscopeio/react-textarea-autocomplete/style.css';
const Item = ({ entity: { label, text, value } }) => {
    if (!label) {
        return <div>{text}</div>;
    } else if (!text) {
        return <div>{label}</div>;
    } else if (!text && !label) {
        return <div>{value}</div>;
    } else {
        return <div>{`${label}: ${text}`}</div>;
    }
};
const Loading = (param) => {
    return <div>Loading</div>;
};
/**
 * @extends {React.Component<TextAreaEditorProps>}
 */
class TextAreaEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaContent: '',
        };
        this.validSuggestionValues = {}; //Keys are the suggestion strings, values are booleans
    }
    async componentDidMount() {
        let load = this.props.load || (() => {});
        let onRef = this.props.onRef || (() => {});
        onRef(this);
        let content = await load();
        await new Promise((resolve, reject) => {
            this.setState({ textAreaContent: content }, () => resolve());
        });
    }
    /**
     * Add a valid suggesiton value to the index
     * @param {string} suggestionValue
     */
    addValidSuggestionValue(suggestionValue) {
        this.validSuggestionValues[suggestionValue] = true;
    }

    isValidSuggestion(suggestionValue) {
        return this.validSuggestionValues[suggestionValue] ? true : false;
    }

    setSelectionRange(selectionStart, selectionEnd) {
        if (this.textarea) {
            setTimeout(() => {
                //We wait for 1ms because of race conditions
                this.textarea.setSelectionRange(selectionStart, selectionEnd);
            }, 1);
        }
    }
    async onChange(e) {
        //Detect changes to the inserted values
        let onChange = this.props.onChange || (() => {});
        let newVal = e.target.value;
        onChange(newVal, e);
        await new Promise((resolve, reject) => {
            this.setState({ textAreaContent: newVal }, () => resolve());
        });
    }
    render() {
        let { className, triggers, placeholder } = this.props;
        return (
            <ReactTextareaAutocomplete
                placeholder={placeholder}
                value={this.state.textAreaContent}
                onChange={this.onChange.bind(this)}
                className={className}
                loadingComponent={Loading}
                ref={(rta) => {
                    this.rta = rta;
                }}
                containerClassName={className}
                innerRef={(textarea) => {
                    this.textarea = textarea;
                }}
                //The autocomplete dropdown menu style
                dropdownStyle={{
                    position: 'absolute',
                    display: 'block',
                }}
                //List item style
                itemStyle={{
                    fontSize: 'small',
                }}
                minChar={0}
                trigger={convertTriggers(this, triggers)}
            />
        );
    }
}
export default TextAreaEditor;
/**
 * @typedef TextAreaEditorProps
 * @property {function(TextAreaEditor): void} [onRef]
 * @property {function} [load]
 * @property {string} [className]
 * @property {function} [onChange]
 * @property {Trigger[]} triggers
 * @property {string} [placeholder]
 */
/**
 * @typedef Trigger
 * @property {string[]} triggers
 * @property {TriggerOption[]} options
 * @property {function(string, TriggerOption): boolean} filter
 */
/**
 * @callback TriggerFilter
 * @param {string} search
 * @returns {AutoCompleteOption[]}
 */
/**
 * @typedef AutoCompleteOption
 * @property {any} label
 * @property {string} description
 * @property {string} value
 */
/**
 * @typedef {Object<string, _TriggerVal>} _Trigger
 */
/**
 * @typedef _TriggerVal
 * @property {function(string): any[]} dataProvider
 * @property {boolean} allowWhitespace
 * @property {boolean} afterWhitespace
 * @property {*} component
 * @property {*} output
 */

/**
 * @typedef TriggerOption
 * @property {string} label
 * @property {string} description
 * @property {any} value
 */

/**
 * @param {TextAreaEditor} editor
 * @param {Trigger[]} triggers
 * @returns {_Trigger}
 */
function convertTriggers(editor, triggers) {
    //Index triggers
    /** @type {Object<string, { trigger: string, options: any[], filters: function[]}>} */
    let triggers_aggr_index = {};
    for (let trigger of triggers) {
        let { triggers: trigger_strs, options, filter } = trigger;
        //Index the options in the editor for lookup
        for (let option of options) {
            editor.addValidSuggestionValue(option.value);
        }
        for (let trigger_str of trigger_strs) {
            let existing_trigger = triggers_aggr_index[trigger_str];
            if (existing_trigger) {
                let new_trigger = {
                    ...existing_trigger,
                    options: [...existing_trigger.options, ...options], //Add all options
                    filters: [...existing_trigger.filters, filter], //Add the filter
                };
                triggers_aggr_index[trigger_str] = new_trigger;
            } else {
                triggers_aggr_index[trigger_str] = {
                    trigger: trigger_str,
                    options,
                    filters: [filter],
                };
            }
        }
    }

    //Convert trigger index
    /** @type {_Trigger} */
    let _triggers = {};
    for (let key in triggers_aggr_index) {
        let trigger_aggr = triggers_aggr_index[key];
        let { trigger: trigger_str, options, filters } = trigger_aggr;
        let dataProvider = (...p) => {
            let token = p[0];
            return (
                options
                    //As long as one filter returns true, return the option
                    .filter((item) => {
                        for (let filter of filters) {
                            if (filter(token, item)) {
                                return true;
                            }
                            return false;
                        }
                    })
                    //Conver the external value to the internal data provider format
                    .map((i) => ({
                        label: i.label,
                        text: i.description,
                        value: i.value,
                    }))
            );
        };
        _triggers[trigger_str] = {
            dataProvider,
            component: Item,
            output: (item, _t) => {
                let caretPosition = 'end';
                return { text: item.value, caretPosition };
            },
            afterWhitespace: true,
            allowWhitespace: true,
        };
    }
    return _triggers;
}
