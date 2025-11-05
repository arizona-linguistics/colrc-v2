/**
 * Editor: Minh Ngo
 * Provides a history display for the roots history,
 * affix history, and stem history
 */

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import TableStyles from "./../stylesheets/table-styles";

function LogHistory(props) {
    let { logData, tableName } = props;

    return (
        <>
            <h1>{ tableName } History</h1>
            {getRows(logData).map((log, i) => (
            <Accordion key={'log-accordion-' + i} style={{'marginBottom': '20px'}} allowZeroExpanded preExpanded={['log-item-0']}>
                <AccordionItem uuid={ 'log-item-' + i }>
                <AccordionItemHeading>
                    <AccordionItemButton>{ log.timestamp }</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div>
                    { /* User info*/ }
                    <h3><u>User Information</u></h3>
                    <h5>User Id: { log.userId }</h5>
                    <h5>User Role: { log.userRole }</h5>

                    { /* Query info*/ }
                    <h3><u>Query Information</u></h3>
                    <h4>ID: { log.id }</h4>
                    <h5>Action: { resolveAction(log.action) }</h5>
                    <p style={{'word-wrap': 'break-word'}}>Query: { log.query }</p>

                    { /* Query Edits */ }
                    <h3><u>Changes</u></h3>
                    <TableStyles>
                        <table>
                        <tbody>
                            <tr>
                            <td><b>Element</b></td>
                            <td><b>Before</b></td>
                            <td><b>After</b></td>
                            </tr>
                            { Object.keys(log.data).map((key, i) => (
                                <tr key={'log_table' + i}>
                                <td key={i + "log_data_key"}>{key}</td>
                                <td key={i + "log_data_value"}>{log.data[key]}</td>
                                <td key={i + "log_data_change"}>{log.changes[key] ?? "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </TableStyles>
                    </div>
                </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
            ))}
        </>
    )
}

function getRows(data) {
    console.log("DATA" + data )
    if (!data) return {};
    let rows = data.map((elem) => {
        let log = {

        // query data
        id: elem.event_id,
        schema: elem.schema_name,
        relid: elem.relid,
        session: elem.session_user_name,
        action: elem.action,
        query: elem.client_query,
        userId: elem.hasura_user ? elem.hasura_user["x-hasura-user-id"] : null,
        userRole: elem.hasura_user ? elem.hasura_user["x-hasura-role"] : null,
        timestamp: (new Date(elem.action_tstamp_clk)).toISOString(),
        transactionId: elem.transaction_id,
        appName: elem.application_name,

        // addr: elem.client_addr,

        // root data
        data: elem.row_data ?? {},
        changes: elem.changed_fields ?? {}
        }
        return log;
    })
    return rows;
}

function resolveAction(action) {
    switch (action) {
        case 'I':
            return 'Insert'
        case 'U':
            return 'Update'
        case 'D':
            return 'Delete'
        default:
            return action;
    }
}

export default LogHistory;
