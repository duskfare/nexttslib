import * as React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Paper from '@material-ui/core/Paper';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
/**
 * @extends {React.Component<TableProps>}
 */
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.isComponentReady = false;
    }
    componentDidMount() {
        this.isComponentReady = true;
    }
    render() {
        const title = this.props.title || '';
        const headers = this.props.headers;
        const rows = this.props.rows;
        const columns = formatColumns(headers);
        const styles = this.props.styles || {};
        const pageSize = this.props.pageSize || 10;
        const actions = this.props.actions;
        if (!this.isComponentReady) {
            return <div />
        }
        return (
            <MaterialTable
                title={title}
                options={{
                    pageSize,
                    selection: true
                }}
                style={{ height: '100%', ...styles }}
                icons={tableIcons} columns={columns}
                data={rows}
                components={{
                    Container: props => <Paper {...props} elevation={0} />
                }}
                actions={actions}
            />
        );
    }
}
export default Table;
/**
 * @typedef TableProps
 * @property {string} [title]
 * @property {TableHeader[]} headers
 * @property {any[]} rows
 * @property {React.CSSProperties} [styles]
 * @property {number} [pageSize]
 * @property {TableAction[]} [actions]
 */
/**
 * @typedef TableHeader
 * @property {string} displayName
 * @property {string} key
 */
/**
 * 
 * @typedef TableAction
 * @property {string} tooltip
 * @property {*} icon
 * @property {function(any)} onClick
 */

/**
 * @param {TableHeader[]} headers 
 */
function formatColumns(headers) {
    return headers.map(header => ({
        title: header.displayName,
        field: header.key
    }))
}