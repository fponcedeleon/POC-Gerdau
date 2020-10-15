import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useTable } from 'react-table'
import { Container, Row, Col } from 'react-bootstrap';
import { getAllMachines } from '../service/machine';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const Table = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const App = ({data}) => {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Machines',
        columns: [
          {
            Header: 'Name',
            accessor: 'nombre',
          },
          {
            Header: 'Installed',
            accessor: 'instalada',
          },
          {
            Header: 'Last Maintenance Date',
            accessor: 'ultimoMantenimiento',
          },
        ],
      },
    ],
    []
  )

  return (
  <Styles>
    <Container fluid>
      <Row className="justify-content-md-center" >
        <Table xs={{span: 4}} columns={columns} data={data} />
      </Row>
    </Container>
  </Styles>)
}

const Foo = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
      getAllMachines().then(res => {
        console.log(res);
        setData(res);
      }).catch(err => {
        console.log(err);
      })
    }, [])
  
  const getApp = () => {
    if (data.length) {
      return <App data={data} />;
    }
    return (
      <Styles>
      <Container fluid>
        <Row className="justify-content-md-center" >
          <Col xs={{ span: 2 }}>No data returned</Col>
        </Row>
      </Container>
      </Styles>
    )
  }

  return (
    <div>
      {getApp()}
    </div>
  )
}

export default Foo;