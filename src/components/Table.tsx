import React from 'react';
import { Table, Box } from '@mantine/core';
import { processTableData } from '../utils/dataProcessing';

const TableComponent: React.FC = () => {
  const tableData = processTableData();
  console.log("table data", tableData);

  return (
    <Box
      style={{
        border: '1px solid var(--mantine-color-gray-5)',
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden'
      }}
    >
      <Table
        withColumnBorders
        horizontalSpacing="xl"
        verticalSpacing="md"
        striped
        highlightOnHover
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with Maximum Production</Table.Th>
            <Table.Th>Crop with Minimum Production</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tableData.map((row) => (
            <Table.Tr key={row.year}>
              <Table.Td>{row.year}</Table.Td>
              <Table.Td>{row.maxCrop}</Table.Td>
              <Table.Td>{row.minCrop}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default TableComponent;
