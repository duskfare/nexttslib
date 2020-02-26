export default function TabControllerHeader(props) {
    let tabHeaderStyle = { display: 'flex', padding: '3px', width: '130px', height: '40px', alignItems: 'center' };
    let tabHeaderIconStyle = {};
    let tabHeaderTextStyle = { display: 'inline-block', flexGrow: 1, textAlign: 'center' };
    let { icon, title } = props;
    return (
        <div style={tabHeaderStyle}>
            {icon}
    <div className="font-md" style={tabHeaderTextStyle}>{title}</div>
        </div>
    )
}