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
 * @template T
 * @extends {React.Component<TextAreaEditorProps<T>>}
 */
class TextAreaEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onChange(e) {
        let onChange = this.props.onChange || (() => {});
        let newVal = e.target.value;
        onChange(newVal);
    }
    render() {
        let { className, triggers } = this.props;
        return (
            <ReactTextareaAutocomplete
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
                trigger={convertTriggers(triggers)}
            />
        );
    }
}
export default TextAreaEditor;
/**
 * @template T
 * @typedef TextAreaEditorProps
 * @property {string} [className]
 * @property {function} [onChange]
 * @property {Trigger<T>[]} triggers
 */
/**
 * @template T
 * @typedef Trigger
 * @property {string[]} triggers
 * @property {T[]} options
 * @property {function(string, T): boolean} filter
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
 * @template T
 * @param {Trigger<T>[]} triggers
 * @returns {_Trigger}
 */
function convertTriggers(triggers) {
    //Index triggers
    /** @type {Object<string, { trigger: string, options: any[], filters: function[]}>} */
    let triggers_aggr_index = {};
    for (let trigger of triggers) {
        let { triggers: trigger_strs, options, filter } = trigger;
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
            output: (item, _t) => item.value,
            afterWhitespace: true,
            allowWhitespace: true,
        };
    }
    return _triggers;
}
