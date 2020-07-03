import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class SearchResult extends React.Component {

    render() {
        const { rows = [] } = this.props;
        console.log(rows);
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Code </TableCell>
                            <TableCell align="left">Message</TableCell>
                            <TableCell align="left">Module</TableCell>
                            <TableCell align="left">Locale</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.code}>
                                <TableCell align="left" >{row.code}</TableCell>
                                <TableCell align="left">{row.message}</TableCell>
                                <TableCell align="left">{row.module}</TableCell>
                                <TableCell align="left">{row.locale}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}



export default SearchResult;